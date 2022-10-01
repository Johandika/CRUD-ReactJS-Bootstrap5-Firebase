import React, { useState, Fragment} from "react";

const RowMahasiswa = (props) => {
  // simpan props mahasiswa ke dalam state agar mudah di akses
  const [formInput, setFormInput] = useState({
    nim: props.mahasiswa.nim,
    nama: props.mahasiswa.nama,
    jurusan: props.mahasiswa.jurusan,
    asalProvinsi: props.mahasiswa.asalProvinsi
  });

  // state untuk menampung pesan error
  const [errors, setErrors] = useState({
    nama: "",
    jurusan: "",
    asalProvinsi: ""
  })

  // state untuk menampung nilai form sebelum Edit Mode
  const [dataReset, setDataReset] = useState({})

  // function untuk penanda Edit Mode
  const [editStatus,setEditStatus] = useState(false);

  // function untuk membuat 2 ways binding antara form dengan state 
  const handleInputChange = (e) => {
    setFormInput({...formInput, [e.target.name] : e.target.value})
  }



  // tombol edit di klik
  const handleEditClick = () => {
    setDataReset({...formInput})

    // masuk ke edit mode
    setEditStatus(true);
  }


  // form di submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let pesanErrors = {};

    // validasi nama
    if (formInput.nama.trim() === ""){
      pesanErrors.nama = "Nama tidak boleh kosong.";
    } else {
      pesanErrors.nama = "";
    }

    // validasi jurusan
    if (formInput.jurusan.trim() === ""){
      pesanErrors.jurusan = "Jurusan tidak boleh kosong.";
    } else {
      pesanErrors.jurusan = "";
    }

    // validasi asalProvinsi
    if (formInput.asalProvinsi.trim() === ""){
      pesanErrors.asalProvinsi = "Asal Provinsi tidak boleh kosong.";
    } else {
      pesanErrors.asalProvinsi = "";
    }

    // update error state
    setErrors(pesanErrors)

    // cek apakah seluruh form valid atau masih ada error 
    let formValid = true;
    for (let propName in pesanErrors){
      if (pesanErrors[propName].length > 0) {
        formValid = false;
      }
    }
     
    // proses data jika form valid
    if (formValid){
      props.onEditMahasiswa(props.mahasiswa.id, formInput);
      setEditStatus(false);
    }
  }

  // tombol batal di klik
  const handleFormReset = (e) => {
    e.preventDefault();

    // kembalikan isi form ke posisi sebelum tombol di klik
    setFormInput({...dataReset});

    // hapus pesan error jika ada
    setErrors({});

    // keluar dari edit mode
    setEditStatus(false);

  }
  
  return(
    <Fragment>
      {/* Tampilkan form jika tombol edit di klik */}
      {editStatus? 
        <tr>
          <td colSpan="5">
            <form onSubmit={handleFormSubmit} onReset={handleFormReset}>
              <div className="row row-cols-5 g-3">
                <div className="col">
                  <input type="text" className="form-control" onChange={handleInputChange} name="nim" disabled defaultValue={formInput.nim}/>
                </div>
                <div className="col">
                  <input type="text" className="form-control" onChange={handleInputChange} name="nama"  value={formInput.nama}/>
                  {errors.nama && <small>{errors.nama}</small>}
                </div>
                <div className="col">
                  <input type="text" name="jurusan" className="form-control" onChange={handleInputChange}  value={formInput.jurusan}/>
                  {errors.jurusan && <small>{errors.jurusan}</small>}
                </div>
                <div className="col">
                  <input type="text" name="asalProvinsi" className="form-control" onChange={handleInputChange}  value={formInput.asalProvinsi}/>
                  {errors.asalProvinsi && <small>{errors.asalProvinsi}</small>}
                </div>
                <div className="col">
                  <button type="submit" className="btn btn-primary">Simpan</button>
                  <button type="reset" className="btn btn-warning">Batal</button>
                </div>
              </div>
            </form>
          </td>
        </tr>
    
        :

        <tr key={formInput.nim}>
          <td>{formInput.nim}</td>
          <td>{formInput.nama}</td>
          <td>{formInput.jurusan}</td>
          <td>{formInput.asalProvinsi}</td>
          <td>
            <button className="btn btn-secondary me-2" onClick={handleEditClick}>Edit</button>
            <button className="btn btn-danger" onClick={props.onDeleteMahasiswa} id={props.mahasiswa.id}>Hapus</button>
          </td>
        </tr> 
      }
    </Fragment>
  )
}

export default RowMahasiswa;