import React, { useState } from 'react'
import Image from 'next/image'
import imageCompression from 'browser-image-compression';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Contents from '@/components/Contents';
import styles from './Register.module.scss';
import axios from 'axios';

export default function Register() {
    const [fileUrl, setFileUrl] = useState(null);
    const [stockName, setStockName] = useState(null);
    const [stockPrice, setStockPrice] = useState(null);
    const [stockCount, setStockCount] = useState(null);
    const [imgLoading, setImgLoading] = useState(null);

    const handleImageUpload = async (e) => {
        const imgFile = e.target.files[0];
        const imgUrl = URL.createObjectURL(imgFile);
        setFileUrl(imgUrl)
        const options = { 
            maxSizeMB: 1,          // (default: Number.POSITIVE_INFINITY)
            maxWidthOrHeight: 500,   // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
            onProgress: (percent) => setImgLoading(percent),       // optional, a function takes one progress argument (percentage from 0 to 100) 
            useWebWorker: true
        }
        const compressedFile = await imageCompression(imgFile, options)
        console.log(compressedFile)
    }

    const submit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:4000/api/stock/register', {
            stockName,
            stockPrice,
            stockCount,
        })

        if (response.status === 200) {
            init()
            alert('상품 등록이 완료되었습니다.')
        }
    }

    const init = () => {
        setStockName(null)
        setStockPrice(null)
        setStockCount(null)
        setFileUrl(null)
    }
    
    return (
        <Contents>
            <h1>상품등록</h1>
            <form className={styles.register_form} onSubmit={submit} >
                <TextField
                    required
                    id="stock-name"
                    label="상품명"
                    variant="outlined"
                    onChange={(e) => setStockName(e.target.value)}
                />
                <TextField
                    required
                    id="stock-price"
                    label="상품가격"
                    variant="outlined"
                    onChange={(e) => setStockPrice(e.target.value)}
                />
                <TextField
                    required
                    id="stock-count"
                    label="상품수량"
                    variant="outlined"
                    onChange={(e) => setStockCount(e.target.value)}
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
                        fileUrl && (
                            <div className={styles.thumbnail}>
                                <img src={fileUrl} alt="img_thumbnail" />
                            </div>
                        )
                    }
                </div>
                <Button variant="contained" color="primary" onClick={submit} >
                    상품 등록
                </Button>
            </form>
        </Contents>
    )
}
