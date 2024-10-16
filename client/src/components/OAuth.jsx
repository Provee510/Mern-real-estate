// import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
// import { app } from '../firebase'
// import {useDispatch} from 'react-redux';
// import {signInSuccess} from '../redux/user/userSlice';

// export default function OAuth() {
//     const dispatch = useDispatch();
//     const handleGoogleClick = async () => {
//         try {
//             const provider = new GoogleAuthProvider()
//             const auth = getAuth(app)

//             const result = await signInWithPopup(auth, provider)
//             const res = await fetch('api/auth/google',{
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
//             })
//              const data = await res.json()
//              dispatch(signInSuccess(data));
//         } catch (error) {
//             console.log('could not connect to google', error);
            
//         }
//     }
//   return (
//     <button onClick={handleGoogleClick} type='button' className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
//     Continue with google
//     </button>
//   )
// }





import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {
    const dispatch = useDispatch();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            // Step 1: Sign in with Google
            const result = await signInWithPopup(auth, provider);

            // Step 2: Send user data to your backend (this part might be redundant depending on your needs)
            const res = await fetch('api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            const data = await res.json(); // Make sure this is an object

            // Step 3: Dispatch the correct user object to Redux
            dispatch(signInSuccess(data)); // Ensure `data` is an object

        } catch (error) {
            console.log('Could not connect to Google:', error);
        }
    };

    return (
        <button
            onClick={handleGoogleClick}
            type='button'
            className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
        >
            Continue with Google
        </button>
    );
}
