import { addDoc, collection, deleteDoc, doc, where, onSnapshot, query, serverTimestamp, orderBy, updateDoc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { docToObject, snapToObject } from './toolApi'

export function listenDbs(path, caller = () => { }, sort = 'asc') {
    const q = query(collection(db, path), orderBy('timeStamp', sort))
    return onSnapshot(q, snap => caller(snapToObject(snap)))
}

export async function updateDb(id, path, data) {
    try {
        await updateDoc(doc(db, path, id), data)
        return { hasError: false }

    } catch (error) {
        return { hasError: true, error }
    }
}

export async function addDb(path, data) {
    try {
        return await addDoc(collection(db, path), {
            ...data,
            createdAt: new Date().toDateString(),
            timeStamp: serverTimestamp()
        })
    } catch (error) {
        console.log(error);
        return { hasError: true, error }
    }
}

export async function getDb(id, path) {
    const doc_ = await getDoc(doc(db, path, id))
    return docToObject(doc_)
}

export async function getDbs(path) {
    const snap = await getDocs(collection(db, path))
    return snapToObject(snap)
}

export async function deleteDb(id, path) {
    return await deleteDoc(doc(db, path, id))
}

export function listenDb(path, id, caller = () => { }) {
    const q = query(doc(db, path, id))
    return onSnapshot(q, snap => caller(docToObject(snap)))
}

export function listenWhere(path, log, caller = () => { }) {
    if (!log || !path) return
    const q = query(
        collection(db, path),
        where(log[0], log[1], log[2]),
        // orderBy('timeStamp', 'asc')
    )
    return onSnapshot(q, snap => caller(snapToObject(snap)))
}

export function listenChats({ langCode, level, stage, }, caller = () => { }) {
    const q = query(
        collection(db, 'chats'),
        where('langCode', '==', langCode),
        where('level', '==', level),
        where('stage', '==', stage),
        orderBy('timeStamp', 'asc')
    )
    return onSnapshot(q, snap => caller(snapToObject(snap)))
}

// export function getLangsData(lang) {
//     const q = query(
//         collection(db,'')
//     )
// }