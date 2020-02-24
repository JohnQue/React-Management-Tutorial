import React, { useState } from 'react';
import { post } from 'axios';

function CustomerAdd({ stateRefresh }) {
  const initialState = {
    file: null,
    userName: '',
    birthday: '',
    gender: '',
    job: '',
    fileName: '',
  };
  const [user, setUser] = useState(initialState);
  const { file, userName, birthday, gender, job, fileName } = user;

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
  return (
    <form onSubmit={onSubmit}>
      <h1>고객 추가</h1>
      프로필 이미지:
      <input
        type="file"
        name="file"
        file={file}
        value={fileName}
        onChange={handleFileChange}
      />
      <br />
      이름:
      <input
        type="text"
        name="userName"
        value={userName}
        onChange={handleValueChange}
      />
      <br />
      생년월일:
      <input
        type="text"
        name="birthday"
        value={birthday}
        onChange={handleValueChange}
      />
      <br />
      성별:
      <input
        type="text"
        name="gender"
        value={gender}
        onChange={handleValueChange}
      />
      <br />
      직업:
      <input type="text" name="job" value={job} onChange={handleValueChange} />
      <br />
      <button type="submit">추가하기</button>
    </form>
  );
}

export default CustomerAdd;
