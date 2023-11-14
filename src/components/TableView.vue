<template>
  <h1>Lista de documentos <div><button @click="cerrarSession" class="btn btn-danger">Cerrar sesion</button></div></h1>
  <div><button @click="nuevoDoc" class="btn btn-info">Crear Documento</button></div><br>
  


<!--modal crear-->
  <div ref="modalCrear" style="display: none;">
    <div class="card text-center">
      <div class="card-header">
        Crear documento
      </div>
      <div class="card-body">
        <form @submit.prevent="nuevoDocData">
          <div class="row">
            <div class="col-4">
              <label for="Nuevo_doc_nombre" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="Nuevo_doc_nombre" v-model="Nuevo_doc_nombre">

            </div>

            <div class="col-4">
              <label for="Nuevo_doc_codigo" class="form-label">Codigo</label>
              <input type="text" class="form-control" id="Nuevo_doc_codigo" v-model="Nuevo_doc_codigo">
            </div>
            <div class="col-4">
              <label for="Nuevo_doc_contenido" class="form-label">Contenido</label>
              <input type="text" class="form-control" id="Nuevo_doc_contenido" v-model="Nuevo_doc_contenido">
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <label for="Nuevo_doc_id_tipo " class="form-label">Id Tipo</label>
              <select name="" class="form-select"   v-model="Nuevo_doc_id_tipo" id="Nuevo_doc_id_tipo">
                
                  <option v-for="docSelect in tipoDocumentoSelect" :key="docSelect.tip_id" :value="docSelect.tip_id">
                   {{ docSelect.tip_id }}-{{docSelect.tip_nombre }}
                  </option>
              </select>
            </div>

            <div class="col-4">
              <label for="Nuevo_doc_id_proceso" class="form-label">Id Proceso</label>
             
              <select name="" class="form-select"   v-model="Nuevo_doc_id_proceso" id="Nuevo_doc_id_tipo">
                
                <option v-for="tipoSelect in tipoProcesoSelect" :key="tipoSelect.pro_id" :value="tipoSelect.pro_id">
                 {{ tipoSelect.pro_id }}-{{tipoSelect.pro_nombre }}
                </option>
            </select>
            </div>
            <div class="col-4">
              <br>

              <div class="d-grid gap-2 d-md-block">
                <button type="submit" class="btn btn-primary">Actualizar</button><br>

              </div>
            </div>
          </div>
          <div class="btn btn-danger" @click="cerrarNuevoDoc">Cancelar</div>
        </form>

      </div>
      <div class="card-footer text-body-secondary">

      </div>
    </div>
  </div>
<!--modal editar-->
  <div ref="modalEditar" style="display: none;">
    <div class="card text-center">
      <div class="card-header">
        Editar documento #{{ docDatosEdit.id }}
      </div>
      <div class="card-body">
        <form @submit.prevent="actualizarDatos">
          <div class="row">
            <div class="col-4">
              <label for="doc_nombre" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="doc_nombre" v-model="docDatosEdit.doc_nombre">

            </div>

            <div class="col-4">
              <label for="doc_codigo" class="form-label">Codigo</label>
              <input type="text" class="form-control" id="doc_codigo" v-model="docDatosEdit.doc_codigo">
            </div>
            <div class="col-4">
              <label for="doc_contenido" class="form-label">Contenido</label>
              <input type="text" class="form-control" id="doc_contenido" v-model="docDatosEdit.doc_contenido">
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <label for="doc_id_tipo" class="form-label">Id Tipo</label>
              <input type="text" class="form-control" id="doc_id_tipo" v-model="docDatosEdit.doc_id_tipo">
            </div>

            <div class="col-4">
              <label for="doc_id_proceso" class="form-label">Id Proceso</label>
              <input type="text" class="form-control" id="doc_id_proceso" v-model="docDatosEdit.doc_id_proceso">
            </div>
            <div class="col-4">
              <br>

              <div class="d-grid gap-2 d-md-block">
                <button type="submit" class="btn btn-primary">Actualizar</button><br>

              </div>
            </div>
          </div>
          <div class="btn btn-danger" @click="salirActualizar">Cancelar</div>
        </form>

      </div>
      <div class="card-footer text-body-secondary">

      </div>
    </div>
  </div>
  <!--tabla contenido-->
  <table class="table">
    <thead class="table-dark">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Nombre</th>
        <th scope="col">Codigo</th>
        <th scope="col">Contenido</th>
        <th scope="col">Id Tipo</th>
        <th scope="col">Id Proceso</th>
        <th scope="col">Fecha de creacion</th>
        <th scope="col">Editar</th>
        <th scope="col">Eliminar</th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="docDato in docDatos" :key="docDato.id">
        <th scope="row">{{ docDato.id }}</th>
        <td>{{ docDato.doc_nombre }}</td>
        <td>{{ docDato.doc_codigo }}</td>
        <td>{{ docDato.doc_contenido }}</td>
        <td>{{ docDato.doc_id_tipo }}</td>
        <td>{{ docDato.doc_id_proceso }}</td>
        <td>{{ docDato.created_at }}</td>
        <td><button class="btn btn-info" @click="editarRegistro(docDato)">editar</button></td>
        <td><button class=" btn btn-danger" @click="eliminarRegistro(docDato.id)">eliminar</button></td>

      </tr>

    </tbody>
  </table>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      Nuevo_doc_nombre: '',
      Nuevo_doc_codigo: '',
      Nuevo_doc_contenido: '',
      Nuevo_doc_id_tipo: '',
      Nuevo_doc_id_proceso: '',
      
      docDatos: [],
      tipoDocumentoSelect:[],
      tipoProcesoSelect:[],

      docDatosEdit: {
        id: null,
        doc_nombre: '',
        doc_codigo: '',
        doc_contenido: '',
        doc_id_proceso: '',
        doc_id_tipo: '',
        created_at: '',
        updated_at: ''
      }
    }
  },
  mounted() {
    this.consultData();
  },
  methods: {
    //consulta de datos
    async consultData() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:8000/api/documento', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const tipoDoc = await axios.get('http://127.0.0.1:8000/api/tipoDocumento', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const tipoProc = await axios.get('http://127.0.0.1:8000/api/tipoProceso', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log('datos documento',tipoProc);
        this.tipoDocumentoSelect = tipoDoc.data;
        this.tipoProcesoSelect = tipoProc.data;
        this.docDatos = res.data;
      } catch (error) {
        console.log(error)
      }
    },
    async nuevoDocData() {
      try {
        const token = localStorage.getItem('token');6
        const res = await axios.post('http://127.0.0.1:8000/api/documento',
        {
          doc_nombre: this.Nuevo_doc_nombre,
          doc_codigo: this.Nuevo_doc_codigo,
          doc_contenido: this.Nuevo_doc_contenido,
          doc_id_tipo: this.Nuevo_doc_id_tipo,
          doc_id_proceso: this.Nuevo_doc_id_proceso,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
        }
        });
        await Swal.fire({
          icon: 'success',
          title: 'documento creado existosamente!',
          showCancelButton: false,
          timer: 15000,
        });
        this.consultData();
        this.cerrarNuevoDoc();
      } catch (error) {
        console.log(error);
      }
     
    },

    nuevoDoc() {

      this.$refs.modalCrear.style.display = 'block';
    },
    cerrarNuevoDoc() {

      this.$refs.modalCrear.style.display = 'none';
    },
    editarRegistro(docDato) {
      this.docDatosEdit = { ...docDato }
      this.$refs.modalEditar.style.display = 'block';
    },
    async actualizarDatos() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.put(`http://127.0.0.1:8000/api/documento/${this.docDatosEdit.id}`, this.docDatosEdit, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        await Swal.fire({
          icon: 'success',
          title: 'documento actualizado existosamente!',
          showCancelButton: false,
          timer: 15000,
        });
        this.consultData();
      } catch (error) {
        console.log(error);
      }

    },
    salirActualizar() {

      this.$refs.modalEditar.style.display = 'none';
    },
    async eliminarRegistro(id) {
      const eliminarModal = await Swal.fire({
        title: 'desea eliminar permanentemente el documento?',
        text: 'una vez eliminado no se podra recuperar!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'blue',
        cancelButtonColor: 'red',
        confirmButtonText: 'eliminar',
        cancelButtonText: 'cancelar',
      });
      if (eliminarModal.isConfirmed) {
        this.eliminarData(id);
      }
    },
    async eliminarData(id) {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.delete(`http://127.0.0.1:8000/api/documento/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        this.consultData();
      } catch (error) {

      }

    },
   async cerrarSession(){
    const token = localStorage.getItem('token');
        const res = await axios.get(`http://127.0.0.1:8000/api/auth/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        await Swal.fire({
          icon: 'success',
          title: 'sesion terminada!',
          showCancelButton: false,
          timer: 15000,
        });
        localStorage.removeItem('token');
        window.location.reload();
    }
    
  }
}
</script>