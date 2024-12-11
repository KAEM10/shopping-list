import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  addDoc,
  setDoc,
  getDoc,
  orderBy,
  limit
} from 'firebase/firestore';
import { environment } from '../environments/environment';
import { ListaCompras, Producto, Sitio } from './model/shopping-list.model';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private app = initializeApp(environment.firebaseConfig);
  private db = getFirestore(this.app);
  private idLastList: string = "";

  // Método para obtener productos de una lista específica
  async obtenerProductosDeListaMasReciente() {
    try {
      // Referencia a la colección 'listacompras'
      const listasRef = collection(this.db, 'listacompras');

      // Ordena por 'fechaRegistro' en orden descendente y limita el resultado a 1
      const ultimaListaQuery = query(listasRef, orderBy('fechaRegistro', 'desc'), limit(1));
      const querySnapshot = await getDocs(ultimaListaQuery);

      if (!querySnapshot.empty) {
        const listaDoc = querySnapshot.docs[0]; // Obtén el primer (y único) documento
        const idLista = listaDoc.id;

        console.log(`El id de la lista es: ${idLista}`);
        this.idLastList = idLista;

        // Referencia a la subcolección 'elementoslista' dentro de la lista específica
        const productosRef = collection(this.db, `listacompras/${idLista}/elementoslista`);

        // Obtén los documentos de la subcolección
        const productosSnapshot = await getDocs(productosRef);
        const productos: Producto[] = [];

        productosSnapshot.forEach((documento: any) => {
          productos.push({
            ...documento.data() as Producto,
          });
        });

        console.log("Productos de la última lista:", productos);
        return productos;
      } else {
        console.log("No se encontraron listas.");
        return [];
      }
    } catch (error) {
      console.error("Error obteniendo productos de la lista más reciente: ", error);
      throw error;
    }
  }
  // Método para obtener productos de una lista específica
  async obtenerProductosDeLista(idLista: string) {
    try {
      // Referencia a la colección 'listacompras'
      const listasRef = collection(this.db, 'listacompras');

      // Crea una consulta para buscar una lista con el id especificado
      const listaQuery = query(listasRef, where('idLista', '==', "'primeralista'"));
      const querySnapshot = await getDocs(listaQuery);

      if (!querySnapshot.empty) {
        const listaDoc = querySnapshot.docs[0]; // Obtén el primer documento con ese idLista
        const idListaDoc = listaDoc.id; // El ID del documento de la lista encontrada

        // Referencia a la subcolección 'elementoslista' dentro de la lista específica
        const productosRef = collection(this.db, `listacompras/${idListaDoc}/elementoslista`);

        // Obtén los documentos de la subcolección
        const productosSnapshot = await getDocs(productosRef);
        const productos: Producto[] = [];

        productosSnapshot.forEach((documento: any) => {
          productos.push({
            ...documento.data() as Producto,
          });
        });

        console.log("Productos de la lista con idLista:", productos);
        return productos;
      } else {
        console.log("No se encontró ninguna lista con el id proporcionado.");
        return [];
      }
    } catch (error) {
      console.error("Error obteniendo productos de la lista con idLista: ", error);
      throw error;
    }
  }
  async agregarLista(nuevaLista: string) {
    try {
      // Referencia a la colección "listacompras"
      const listaRef = doc(collection(this.db, "listacompras"), nuevaLista);

      // Agregar un documento con datos personalizados
      await setDoc(listaRef, {
        fechaRegistro: new Date(), // Fecha actual
      });

      console.log(`Lista '${nuevaLista}' agregada correctamente.`);
    } catch (error) {
      console.error("Error al agregar la lista:", error);
    }
  }
  async duplicarLista(nombreListaOrigen: string, nombreListaDestino: string) {
    try {
      // Referencia a la colección origen
      const origenRef = collection(this.db, `listacompras/${nombreListaOrigen}/elementoslista`);
      const destinoRef = collection(this.db, `listacompras/${nombreListaDestino}/elementoslista`);
  
      // Obtener los documentos de la colección origen
      const querySnapshot = await getDocs(origenRef);
  
      // Iterar sobre los documentos de la colección origen y copiarlos a la colección destino
      for (const docSnapshot of querySnapshot.docs) {
        const datosElemento = docSnapshot.data(); // Obtener datos del documento
  
        // Crear una copia de los datos y agregar un nuevo campo de fechaRegistro
       
  
        // Crear un nuevo documento con un ID único en la colección destino usando setDoc
        const destinoDocRef = doc(destinoRef, docSnapshot.id,); // Usamos el mismo ID que el original
       
        await setDoc(destinoDocRef, {
          ...datosElemento,  // Copiar todos los datos del documento origina

          fechaRegistro: new Date()
        });
        console.log(`Documento ${docSnapshot.id} copiado con éxito con fecha de registro`);
      }
  
      const listaRef = doc(collection(this.db, "listacompras"), nombreListaDestino);

      await setDoc(listaRef, {  // Copiar todos los datos del documento origina

        fechaRegistro: new Date()
      });
      console.log('Copia de la lista realizada con éxito');
    } catch (error) {
      console.error('Error al copiar y crear el nuevo registro:', error);
    }
  }
  
  async obtenerProductosDeTodasLasListas() {
    try {
      // Referencia a la colección 'listacompras'
      const listasRef = collection(this.db, 'listacompras');
  
      // Obtén todas las listas sin filtros
      const querySnapshot = await getDocs(listasRef);
  
      if (!querySnapshot.empty) {
        const todasLasListas: { idLista: string; productos: Producto[] }[] = [];
  
        for (const listaDoc of querySnapshot.docs) {
          const idLista = listaDoc.id;
  
          // Referencia a la subcolección 'elementoslista' dentro de cada lista
          const productosRef = collection(this.db, `listacompras/${idLista}/elementoslista`);
  
          // Crea una consulta ordenando por 'fechaRegistro'
          const productosQuery = query(productosRef, orderBy('fechaRegistro', 'desc')); // Usa 'desc' para orden descendente
  
          // Obtén los documentos de la subcolección aplicando la consulta
          const productosSnapshot = await getDocs(productosQuery);
          const productos: Producto[] = [];
  
          productosSnapshot.forEach((documento: any) => {
            productos.push({
              ...documento.data() as Producto,
            });
          });
  
          // Guarda la lista con sus productos ordenados
          todasLasListas.push({ idLista, productos });
        }
  
        console.log('Productos de todas las listas ordenados:', todasLasListas);
        return todasLasListas;
      } else {
        console.log('No se encontraron listas.');
        return [];
      }
    } catch (error) {
      console.error('Error obteniendo productos de todas las listas: ', error);
      throw error;
    }
  }

  async agregarProductoAListaMasNueva(producto: Producto) {

    try {
      producto.idLista = this.idLastList;
      
      const productosRef = collection(this.db, `listacompras/${this.idLastList}/elementoslista`);
      const docRef = await addDoc(productosRef, producto);

      // Guardar el id generado automáticamente en el mismo documento
      await updateDoc(docRef, {
        id: docRef.id
      });

      console.log(`Producto agregado con nuevo ID: ${docRef.id}`);

      return docRef.id;
    } catch (error) {
      console.error("Error al agregar o actualizar el producto: ", error);
      throw error;
    }
  }

  async actualizarProducto(producto: Producto) {
    try {
    
      const productoRef = doc(this.db, `listacompras/${this.idLastList}/elementoslista/${producto.id}`);
      await updateDoc(productoRef, { ...producto });
      console.log(`Producto con ID ${producto.id} actualizado.`);
      
      return producto.id;

    } catch (error) {
      console.error("Error al agregar o actualizar el producto: ", error);
      throw error;
    }
  }


  async agregarSitio(sitio: Sitio) {
    try {
      const coleccionRef = collection(this.db, "sitios");
      const docRef = await addDoc(coleccionRef, sitio);

      await updateDoc(docRef, {
        id: docRef.id
      });

      console.log("Documento agregado con ID:", docRef.id);

      return docRef.id;
    } catch (error) {
      console.error("Error agregando documento:", error);
      throw error;
    }
  }

  async obtenerSitios() {
    try {
      const sitiosRef = collection(this.db, 'sitios');
      const sitiosSnap = await getDocs(sitiosRef);

      if (!sitiosSnap.empty) {
        const sitios: Sitio[] = [];

        sitiosSnap.forEach((documento: any) => {
          sitios.push({
            ...documento.data() as Sitio,
          });
        });

        console.log("Sitios lista:", sitios);
        return sitios;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error obteniendo la lista: ", error);
      throw error;
    }
  }

  async actualizarProductoAComprado(idLista: string, idProducto: string) {
    try {
      // Referencia al documento del producto en la subcolección 'elementoslista'
      const productoRef = doc(this.db, `listacompras/${idLista}/elementoslista`, idProducto);

      // Verificar si el producto existe
      const productoDoc = await getDoc(productoRef);
      if (!productoDoc.exists()) {
        console.log("El producto no existe");
        return;
      }

      // Actualizar el campo 'comprado' a true o false según el valor pasado
      await updateDoc(productoRef, {
        comprado: true
      });

    } catch (error) {
      console.error("Error actualizando el estado del producto", error);
      throw error;
    }
  }

  async borrarProductoDeLista(idLista: string, idProducto: string) {
    try {
      // Referencia al documento del producto en la subcolección 'elementoslista'
      const productoRef = doc(this.db, `listacompras/${idLista}/elementoslista`, idProducto);

      // Verificar si el producto existe antes de eliminarlo (opcional)
      const productoDoc = await getDoc(productoRef);
      if (!productoDoc.exists()) {
        console.log("El producto no existe. No se puede eliminar.");
        return false; // Devuelve false si el producto no existe
      }

      // Eliminar el documento del producto
      await deleteDoc(productoRef);
      console.log(`Producto con ID ${idProducto} eliminado correctamente.`);
      return true; // Devuelve true si la eliminación fue exitosa
    } catch (error) {
      console.error("Error al eliminar el producto: ", error);
      throw error;
    }
  }
}

