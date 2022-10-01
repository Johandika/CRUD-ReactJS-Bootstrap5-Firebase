import React,{useState} from "react";

const RowTambahMahasiswa = (props) => {
    // state untuk data inputan form
    const[formInput,setFormInput] = useState({
      nim : "",
      nama : "",
      jurusan : "",
      asalProvinsi : ""
    })

    // state untuk menampung pesan erros
    const[errors,setErrors] = useState({
      nim : "",
      nama : "",
      jurusan : "",
      asalProvinsi : ""
    })

    // function untuk membuat 2 ways binding antara form dengan state
    const handleInputChange = (e) => {
      setFormInput({...formInput,[e.target.name] : e.target.value})
    }

    const cekDuplikasiNim = () => {
      return (props.mahasiswas.find((mahasiswa) => 
        mahasiswa.nim === formInput.nim
      ))
    }

    const handleFormSubmit = (e) => {
      e.preventDefault();
      let pesanError = {};

      // validasi NIM
      if (!formInput.nim) {
        pesanError.nim = ("NIM tidak boleh kosong!")
      } else if (!/^[0-9]{8}$/.test(formInput.nim)) {
        pesanError.nim = "NIM harus 8 karakter angka";
      } else if (cekDuplikasiNim()) {
        pesanError.nim = "NIM sudah dipakai";
      } else {
        pesanError.nim = "";
      }

      // validasi nama 
      if (formInput.nama.trim() === "") {
        pesanError.nama = "Nama tidak boleh kosong.";
      } else {
        pesanError.nama = "";
      }

      // validasi jurusan 
      if (formInput.jurusan.trim() === "") {
        pesanError.jurusan = "Jurusan tidak boleh kosong.";
      } else {
        pesanError.jurusan = "";
      }

      // validasi asal provinsi
      if (formInput.asalProvinsi.trim() === "") {
        pesanError.asalProvinsi = "Asal provinsi tidak boleh kosong."
      } else {
        pesanError.asalProvinsi = "";
      }

      // update error state 
      setErrors(pesanError)

      // cek apakah seluruh form valid atau masih ada error
      let formValid = true;
      for (let inputName in pesanError) {
        if (pesanError[inputName].length > 0 ) {
          formValid = false;
        }
      }
      
      // proses data jika form valid
      if (formValid) {
        props.onTambahMahasiswa(formInput);

        // kosongkan inputan form
        setFormInput({
          nim: "",
          nama: "",
          jurusan: "",
          asalProvinsi: ""
        })
      }
    }

  return(
    <tr>
      <td colSpan="5">
        <form onSubmit={handleFormSubmit}>
          <div className="row row-cols-5 g-3">
            <div className="col">
              <input type="text" className="form-control" name="nim" placeholder="00000000" onChange={handleInputChange} value={formInput.nim}/>
              {errors.nim && <small>{errors.nim}</small>}
            </div>
            <div className="col">
              <input type="text" className="form-control" name="nama" placeholder="Fulana Fulana" onChange={handleInputChange} value={formInput.nama}/>
              {errors.nama && <small>{errors.nama}</small>}
            </div>
            <div className="col">
              <input type="text" name="jurusan" className="form-control" placeholder="Sistem Informasi" onChange={handleInputChange} value={formInput.jurusan}/>
              {errors.jurusan && <small>{errors.jurusan}</small>}
            </div>
            <div className="col">
              <input type="text" name="asalProvinsi" className="form-control" placeholder="Asal Provinsi" onChange={handleInputChange} value={formInput.asalProvinsi}/>
              {errors.asalProvinsi && <small>{errors.asalProvinsi}</small>}
            </div>
            <div className="col">
              <button type="submit" className="btn btn-primary">Tambah</button>
            </div>
          </div>
        </form>
      </td>
    </tr>
  )
}

export default RowTambahMahasiswa;