import React, { useState } from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  hidden: {
    display: 'none',
  },
});

function CustomerAdd({ stateRefresh, props }) {
  const initialState = {
    file: null,
    userName: '',
    birthday: '',
    gender: '',
    job: '',
    fileName: '',
    open: false,
  };
  const [user, setUser] = useState(initialState);
  const { file, userName, birthday, gender, job, fileName, open } = user;

  const onSubmit = e => {
    e.preventDefault();
    addCustomer().then(response => {
      console.log(response.data);
      stateRefresh();
    });
    setUser(initialState);
  };

  const handleFileChange = e => {
    setUser({
      ...user,
      file: e.target.files[0],
      fileName: e.target.value,
    });
  };

  const handleValueChange = e => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', userName);
    formData.append('birthday', birthday);
    formData.append('gender', gender);
    formData.append('job', job);

    //웹 표준에 맞는 헤더 추가
    const config = {
      headers: {
        //파일 전송시 추가해줘야 함
        'content-type': 'multipart/form-data',
      },
    };
    return post(url, formData, config);
  };

  const handleClickOpen = () => {
    setUser({
      ...user,
      open: true,
    });
  };
  const handleClose = () => {
    setUser(initialState);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        고객 추가하기
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>고객 추가</DialogTitle>
        <DialogContent>
          <input
            className={styles.hidden}
            style={{ display: 'none' }}
            accept="image/*"
            id="raised-button-file"
            type="file"
            file={file}
            value={fileName}
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              name="file"
            >
              {fileName === '' ? '프로필 이미지 선택' : fileName}
            </Button>
          </label>
          <br />
          <TextField
            label="이름"
            type="text"
            name="userName"
            value={userName}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="생년월일"
            type="text"
            name="birthday"
            value={birthday}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="성별"
            type="text"
            name="gender"
            value={gender}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="직업"
            type="text"
            name="job"
            value={job}
            onChange={handleValueChange}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            추가
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(CustomerAdd);
