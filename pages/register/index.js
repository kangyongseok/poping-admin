import React, { useState } from 'react'
import Image from 'next/image'
import imageCompression from 'browser-image-compression';
import TextField from '@material-ui/core/TextField';
import Contents from '@/components/Contents';
import styles from './Register.module.scss';

export default function Register() {
    const [fileUrl, setFileUrl] = useState(null);

    const handleImageUpload = async (e) => {
        const imgFile = e.target.files[0];
        const imgUrl = URL.createObjectURL(imgFile);
        setFileUrl(imgUrl)
        const options = { 
            maxSizeMB: 1,          // (default: Number.POSITIVE_INFINITY)
            maxWidthOrHeight: 500,   // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
            onProgress: (percent) => console.log(percent),       // optional, a function takes one progress argument (percentage from 0 to 100) 
            useWebWorker: true
        }
        const compressedFile = await imageCompression(imgFile, options)
        console.log(compressedFile)
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
                <div>
                    <label htmlFor="img_upload">이미지 업로드</label>
                    <input
                        id="img_upload"
                        type="file"
                        accept='image/jpg,impge/png,image/jpeg,image/gif'
                        name='stock_img'
                        className={styles.file_upload_input}
                        onChange={handleImageUpload}
                    />
                    {
                        fileUrl && 
                        <div className={styles.thumbnail}>
                            <img src={fileUrl} alt="img_thumbnail" />
                        </div>
                    }
                </div>
            </form>
        </Contents>
    )
}
