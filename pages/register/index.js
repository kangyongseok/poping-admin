import React, { useState } from 'react'
import Image from 'next/image'
import imageCompression from 'browser-image-compression';
import TextField from '@material-ui/core/TextField';
import Contents from '@/components/Contents';
import styles from './Register.module.scss';


async function handleImageUpload(event) {

    const imageFile = event.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 500,
        useWebWorker: true
    }
    try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
            // 변환 완료!
            const base64data = reader.result;

            // formData 만드는 함수
            console.log(base64data)
        };
    } catch (error) {
        console.log(error);
    }
}

export default function Register() {
    const [imgUrl, setImgUrl] = useState(null)

    async function handleImageUpload(event) {
        const imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
            const reader = new FileReader();
            reader.onloadend = () => {
                // 변환 완료!
                setImgUrl(reader.result)
                const base64data = reader.result;
    
                // formData 만드는 함수
                
            };
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Contents>
            <h1>상품등록</h1>
            <form className={styles.register_form}>
                <TextField
                    required
                    id="standard-required"
                    label="상품명"
                    variant="outlined"
                />
                <TextField
                    required
                    id="standard-required"
                    label="상품가격"
                    variant="outlined"
                />
                {console.log(imgUrl)}
                {imgUrl && <Image src={imgUrl} alt="Picture of the author" />}
                <label htmlFor="img_upload">이미지 업로드</label>
                <input
                    id="img_upload"
                    type="file"
                    accept='image/jpg,impge/png,image/jpeg,image/gif'
                    name='stock_img'
                    className={styles.file_upload_input}
                    onChange={handleImageUpload}
                />
            </form>
        </Contents>
    )
}
