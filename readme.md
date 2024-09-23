
# HIMTI API

Important data regarding HIMTI

Base URL
```bash
  https://himti-api.vercel.app
```

### Authentication 
Register
```bash
  {
    path: "/auth/register",
    method: POST
    body: {
        name: "Example",
        email: "example@example.com",
        password: "example123"
    }
  }
```

Login
```bash
  {
    path: "/auth/login",
    method: POST
    body: {
        email: "example@example.com",
        password: "example123"
    }
  }
```
```
{
    "status": 200,
    "code": "SUCCESS",
    "message": "User logged in successfully",
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjZlYjc3ZDc5MWNkMDA0ODhjZDc4ZCIsIm5hbWUiOiJNdWhhbW1hZCBGaWtyaSIsImVtYWlsIjoiTXVoZmlrcmlAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE4MzY4NjIyfQ.s1tPLCzgX7XAPg-ZFAeEIy0-r7Kz8bMIdeTh7gTJh7g"
    }
}
```

### Angkatan 
Get Angkatan
```bash
  {
    path: "/angkatan",
    method: GET,
    queryParams: {
        page: 1 -> (default = 1),
        perPage: 10 -> (default = 10),
        search: 2020
    }
  }
```
With Query Params
```bash
  /angkatan?page=1&perPage=10&name=2020
```

Create Angkatan
```bash
  {
    path: "/angkatan",
    method: POST
    body: {
        angkatan: 2023,
        isActive: true  -> optional (default = true)
    }
  }
```

Update Angkatan
```bash
  {
    path: "/angkatan/:id",
    method: PUT
    body: {
        angkatan: 2023,
        isActive: true
  }
```

Delete Angkatan
```bash
  {
    path: "/angkatan/:id",
    method: DELETE
```

### Anggota 
Get Anggota
```bash
  {
    path: "/anggota",
    method: GET,
    queryParams: {
        page: 1 -> (default = 1),
        perPage: 10 -> (default = 10),
        name: "fikri"
    }
  }
```
With Query Params
```bash
  /anggota?page=1&perPage=10&name=fikri
```

Create Anggota
```bash
  {
    path: "/anggota",
    method: POST
    body: {
        nim: 22552012333 -> required,
        name: "Muhammad Fikri" -> required,
        angkatanId: "6666fd9be909b426c8aede32" -> required,
        email: "muhfikriantoaji2@gmail.com" -> optional,
        isActive: true -> optional (default = true)
    }
  }
```

Update Anggota
```bash
  {
    path: "/anggota/:id",
    method: PUT
    body: {
        nim: 22552012333,
        name: "Muhammad Fikri new",
        angkatanId: "6666fd9be909b426c8aede32",
        email: "muhfikriantoaji2@gmail.com",
        isActive: false
  }
```

Delete Anggota
```bash
  {
    path: "/anggota/:id",
    method: DELETE
```

### Dosen 
Get Dosen
```bash
  {
    path: "/dosen",
    method: GET,
    queryParams: {
        page: 1 -> (default = 1),
        perPage: 10 -> (default = 10),
        name: "fikri"
    }
  }
```
With Query Params
```bash
  /dosen?page=1&perPage=10&name=fikri
```

Create Dosen
```bash
  {
    path: "/dosen",
    method: POST
    body: {
        nidn: 259525024 -> required, 
        name: "Fikri" -> required, 
        email: "fikri5@gmail.com" -> required, 
        numberPhone: 8951212 -> required, 
        mataKuliah: "Pemrograman Dasar" -> optional, 
        isActive: true -> optional (default = true) 
    }
  }
```

Update Dosen
```bash
  {
    path: "/dosen/:id",
    method: PUT
    body: {
        nidn: 259525024, 
        name: "Fikri", 
        email: "fikri5@gmail.com", 
        numberPhone: 8951212, 
        mataKuliah: "Pemrograman Dasar", 
        isActive: true
  }
```

Delete Dosen
```bash
  {
    path: "/dosen/:id",
    method: DELETE
```


### Struktural 
Get Struktural
```bash
  {
    path: "/struktural",
    method: GET,
    queryParams: {
        page: 1 -> (default = 1),
        perPage: 10 -> (default = 10),
        name: "fikri"
    }
  }
```
With Query Params
```bash
  /struktural?page=1&perPage=10&name=fikri
```

Create Struktural
```bash
  {
    path: "/struktural",
    contentType: "multipart/form-data",
    method: POST
    body: {
        
        anggotaId: "6666fd9be909b426c8aede32" -> required,
        image: "/path/image.png" -> required,
        instagram: "https://instagram.com" -> optional, 
        twitter: "https://twitter.com" -> optional, 
        facebook: "https://facebook.com" -> optional, 
        linkedin: "https://linkedin.com" -> optional,
        isActive: true -> optional (default = true)
    }
  }
```

Update Struktural
```bash
  {
    path: "/struktural/:id",
    method: PUT,
    contentType: "multipart/form-data",
    body: {
       
        anggotaId: "6666fd9be909b426c8aede32",
        image: "/path/image.png",
        instagram: "https://instagram.com", 
        twitter: "https://twitter.com", 
        facebook: "https://facebook.com", 
        linkedin: "https://linkedin.com",
        isActive: true
  }
```

Delete Struktural
```bash
  {
    path: "/struktural/:id",
    method: DELETE
```


### Alumni 
Get Alumni
```bash
  {
    path: "/alumni",
    method: GET,
    queryParams: {
        page: 1 -> (default = 1),
        perPage: 10 -> (default = 10),
        name: "fikri"
    }
  }
```
With Query Params
```bash
  /alumni?page=1&perPage=10&name=fikri
```

Create Alumni
```bash
  {
    path: "/alumni",
    contentType: "multipart/form-data",
    method: POST
    body: {
        angkatanId: "6666fd9be909b426c8aede32" -> required,
        anggotaId: "666b00f41c5fd055c7a0b62c" -> required
        company: PT. Example Jaya -> required,
        image: "/path/image.jpg" -> required,
        isActive: true -> optional (default = true)
    }
  }
```

Update Alumni
```bash
  {
    path: "/alumni/:id",
    method: PUT,
    contentType: "multipart/form-data",
    body: {
        angkatanId: "6666fd9be909b426c8aede32",
        anggotaId: "666b00f41c5fd055c7a0b62c"
        company: PT. Example Jaya,
        image: "/path/image.jpg",
        isActive: true
    }
  }
```

Delete Alumni
```bash
  {
    path: "/alumni/:id",
    method: DELETE
```


### Acara 
Get Acara
```bash
  {
    path: "/acara",
    method: GET,
    queryParams: {
        page: 1 -> (default = 1),
        perPage: 10 -> (default = 10),
        name: "sharing"
    }
  }
```
With Query Params
```bash
  /acara?page=1&perPage=10&name=fikri
```

Create Acara
```bash
  {
    path: "/acara",
    contentType: "multipart/form-data",
    method: POST
    body: {
        name: "Sharing Jaringan"
        description: "lorem ipsum dolor sit amet" -> optional,
        startTime: "2023-09-05T22:56:46.000Z" -> optional,
        endTime: "2023-09-05T22:56:46.000Z" -> optional,
        image: "/path/image.png",
        isActive: true -> optional (default = true)
    }
  }
```

Update Acara
```bash
  {
    path: "/acara/:id",
    method: PUT,
    contentType: "multipart/form-data",
    body: {
        name: "Sharing Jaringan"
        description: "lorem ipsum dolor sit amet",
        startTime: "2023-09-05T22:56:46.000Z",
        endTime: "2023-09-05T22:56:46.000Z",
        image: "/path/image.png",
        isActive: true
    }
  }
```

Delete Acara
```bash
  {
    path: "/acara/:id",
    method: DELETE
```
