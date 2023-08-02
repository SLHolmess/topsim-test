import { useState } from 'react';
import { TextInput, Button, toaster } from 'evergreen-ui';
import Axios from '../../helpers/client/axios';

export default function AdminLoginBox() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const login = async () => {
    try {
      const res = await Axios.post('/users/login', { username, password });
  
      if (res.data.success) {
        localStorage.setItem('token', res.data.data.token);
        location.replace('/admin');
      } else {
        toaster.danger('Tên đăng nhập hoặc mật khẩu không đúng!')
      }
    } catch(err: any) {
      toaster.danger(`Lỗi hệ thống: ${err.message}`, { duration: 3 });
    }
  }

  return <div className="flex flex-col gap-2 w-00 min-h-48 shadow-md rounded-md mt-24 p-3 bg-white">
    <h1 className="text-xl pb-2">Đăng nhập hệ thống DTH CRM</h1>

    <div className="flex gap-3">
      <div className="w-24">Username</div>
      <div className="flex-grow">
        <TextInput
          name="text-input-name"
          width="100%"
          placeholder="Username"
          value={username}
          onChange={(e: any) => setUsername(e.target.value)}
        />
      </div>
    </div>

    <div className="flex gap-3">
      <div className="w-24">Password</div>
      <div className="flex-grow">
        <TextInput
          name="text-input-name"
          width="100%"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          onKeyDown={(e: any) => e.keyCode === 13 ? login() : true}
        />
      </div>
    </div>

    <div className="mt-2">
      <Button appearance="primary" onClick={() => login()}>
        Đăng nhập
      </Button>
    </div>
  </div>
}