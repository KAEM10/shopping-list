import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc,
  getDocs,
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
  
        // Referencia a la subcolección 'elementoslista' dentro de la lista específica
        const productosRef = collection(this.db, `listacompras/${idLista}/elementoslista`);
  
        // Obtén los documentos de la subcolección
        const productosSnapshot = await getDocs(productosRef);
        const productos: Producto[] = [];
  
        productosSnapshot.forEach((documento) => {
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

  async agregarProductoALista(idLista: string, producto: Producto) {
    try {
      // Referencia al documento de la lista
      const listaRef = doc(this.db, 'listacompras', idLista);
      
      // Verificar si la lista existe
      const listaDoc = await getDoc(listaRef);
      
      // Si la lista no existe, crearla
      if (!listaDoc.exists()) {
        await setDoc(listaRef, {
          fechaRegistro: new Date()
        });
        
        console.log('Lista creada automáticamente');
      }
  
      // Referencia a la subcolección de elementos de la lista
      const productosRef = collection(
        this.db, 
        `listacompras/${idLista}/elementoslista`
      );
      
      // Agregar el producto
      const docRef = await addDoc(productosRef, {
        nombre: producto.nombre,
        idSitio: producto.idSitio,
      });
      
      console.log("Producto agregado con id: " + docRef.id);
      
      return docRef.id;
    } catch (error) {
      console.error("Error agregando producto: ", error);
      throw error;
    }
  }

  async agregarSitio(sitio: Sitio) {
    try {
      const coleccionRef = collection(this.db, "sitios");
      const docRef = await addDoc(coleccionRef, sitio);
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
        
        sitiosSnap.forEach((documento) => {
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
}
