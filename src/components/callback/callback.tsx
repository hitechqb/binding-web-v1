import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import style from "./callback.module.scss";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Callback() {
  let query = useQuery();
  let requestid = query.get("requestid");
  let appid = query.get("appid");

  console.log("requestid: ", requestid, "appid: ", appid);

  let _isValid: boolean;
  const appId = localStorage.getItem("app_id");
  const requestId = localStorage.getItem("request_id");
  console.log("app_id: ", appId, "request_id: ", requestId);

  _isValid = appid === appId && requestid === requestId;

  const [error, setError] = useState(true);

  useEffect(() => {
    handleOnload();
  });

  function handleOnload() {
    if (_isValid) {
      setError(false);
    }
  }

  return (
    <>
      <div className={style.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={style.boxWrapper}
        >
          <div className={style.boxImage} />
          <h5>{!error ? "Đăng ký thành công" : "Đăng ký thất bại"}</h5>
          {!error ? (
            <Alert severity="success" className={style.description}>
              Bạn đã đăng ký thành công dịch vụ thanh toán tự động
            </Alert>
          ) : (
            <Alert severity="error" className={style.description}>
              Có lỗi xảy ra, dịch vụ thanh toán tự động thất bại
            </Alert>
          )}

          <Button
            variant="contained"
            size="large"
            className={clsx(style.row, style.btnToHome)}
            href={"/"}
          >
            Quay về trang chủ
          </Button>
        </Grid>
      </div>
    </>
  );
}

// http://example.com?
// url=http%3A%2F%2Fexample1.com%3F
// appid%3D2553%26
// requestid%3D59DmllEj0dznv_gpZoxf2lkpXxPtsMbXUQbILiQoa2w%26
// reqdate%3D1601868429236%26
// returncode%3D210%26
// mac%3D647b6dc70cc81689d4df7f4da73256f18f82f0ba3cfa63c711288c076c1a24b4
