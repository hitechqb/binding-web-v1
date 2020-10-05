import React, { useRef, useState } from "react";
import Grid from "@material-ui/core/Grid";
import style from "./create-binding.module.scss";
import { Button } from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Alert, AlertTitle } from "@material-ui/lab";
import clsx from "clsx";
import useFetchBinding from "../../hooks/useFetchBinding";

function Index() {
  window.document.title = "ZaloPay - Binding";
  const [identifier, setIdentifier] = useState();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { callback } = useFetchBinding(identifier);

  const handleOnChange = (identifier: string) => {
    console.log("identifier: ", identifier);
    setIdentifier(identifier);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(identifier);
    if (!identifier) {
      setErrorMessage("Vui lòng nhập thông tin định danh");
      return;
    }

    const { data, error } = await callback();
    if (error || error !== undefined) {
      console.log("error: ", error);
      setErrorMessage(error);
    } else {
      console.log("data: ", data);
      const requestData = data.request_data;
      const responseData = JSON.parse(data.response_data);
      if (responseData.returncode === 1) {
        console.log("responseData: ", responseData);
        console.log("app_id: ", requestData.app_id);
        console.log("request_id: ", responseData.requestid);
        //----
        localStorage.clear();
        localStorage.setItem("app_id", requestData.app_id);
        localStorage.setItem("request_id", responseData.requestid);
        gotoBindingPage(responseData.h5Url);
      } else {
        console.log("return_code: ", responseData.returncode);
        console.log("return_message: ", responseData.returnmessage);
        setErrorMessage(responseData.returnmessage);
      }
    }
  };

  const gotoBindingPage = (url: string) => {
    console.log("gotoBindingPage - URL: ", url);
    window.location.href = url;
  };

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
          <h5>Thanh toán tự động</h5>
          <p className={style.description}>
            Vui lòng nhập mã định danh để thực hiện thanh toán tự động qua ví
            ZaloPay
          </p>
          <form
            onSubmit={handleSubmit}
            className={style.form}
            noValidate
            autoComplete="off"
          >
            <OutlinedInput
              id="outlined-identifier"
              value={identifier}
              onChange={(e) => handleOnChange(e.target.value)}
              labelWidth={0}
              spellCheck={"false"}
              className={clsx(style.row, style.inputIdentifier)}
            />

            <div
              className={clsx(
                !errorMessage ? style.boxNoError : "",
                style.sessionError
              )}
            >
              <Alert severity="error">
                <AlertTitle>Có lỗi xảy ra</AlertTitle>
                {errorMessage}
              </Alert>
            </div>
            <Button
              variant="contained"
              size="large"
              className={clsx(style.row, style.btnAccept)}
              type={"submit"}
            >
              Đồng ý
            </Button>
          </form>
        </Grid>
      </div>
    </>
  );
}

export default Index;

//59DmllEj0dznv_gpZoxf2rcKJrI8DBxJMre8_S9dHPE
