import { auth, provider, storage } from '../firebase'
import db from '../firebase'
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from './actionType'

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
})

export const setLoading = (status) => ({
  type: SET_LOADING_STATUS,
  status: status,
})

export const getArticles = (payload) => ({
  type: GET_ARTICLES,
  payload: payload,
})

export function signInAPI() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((payload) => {
        dispatch(setUser(payload.user))
      })
      .catch((error) => alert(error.message))
  }
}

export function getUserAuth() {
  return (dispatch) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(setUser(user))
      }
    })
  }
}

export function signOutAPI() {
  return (dispatch) => {
    signOut(auth)
      .then(() => dispatch(setUser(null)))
      .catch((error) => console.log(error.messsage))
  }
}

export function postArticleAPI(payload) {
  return (dispatch) => {
    dispatch(setLoading(true))
    if (payload.image !== '') {
      const storageRef = ref(storage, `images/${payload.image.name}`)
      const uploadTask = uploadBytesResumable(storageRef, payload.image)
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          console.log('File available at', downloadURL)

          //add to collection
          console.log(payload.user)
          const docRef = await addDoc(collection(db, 'articles'), {
            actor: {
              description: payload.user.email,
              title: payload.user.displayName,
              date: payload.timestamp,
              image: payload.user.photoURL,
            },
            video: payload.video,
            sharedImg: downloadURL,
            comments: 0,
            description: payload.description,
          })
          dispatch(setLoading(false))

          console.log('Document written with ID: ', docRef.id)
        },
      )
    } else if (payload.video) {
      addDoc(collection(db, 'articles'), {
        actor: {
          description: payload.user.email,
          title: payload.user.displayName,
          date: payload.timestamp,
          image: payload.user.photoURL,
        },
        video: payload.video,
        sharedImg: '',
        comments: 0,
        description: payload.description,
      })
      dispatch(setLoading(false))
    }
  }
}

export function getArticlesAPI() {
  return async (dispatch) => {
    let payload = []

    const querySnapshot = await getDocs(collection(db, 'articles'))
    querySnapshot.docs.forEach((doc) => {
      payload.push(doc.data())
    })
    dispatch(getArticles(payload))
  }
}
