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
    const [stockImage, setImage] = useState(null);
    const [stockImageName, setImageName] = useState(null);

    const encodeBase64ImageFile = (image) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(image)
            reader.onload = (event) => {
              resolve(event.target.result)
            }
            reader.onerror = (error) => {
              reject(error)
            }
          })
    }

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
        const reader = new FileReader();
        const encode = await encodeBase64ImageFile(compressedFile)
        const split = encode.split(',');
        setImage(split[split.length - 1])
        setImageName(compressedFile.name)
        console.log(split[split.length - 1], compressedFile.name)
    }

    const submit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:4000/api/stock/register', {
            stockName,
            stockPrice,
            stockCount,
            stockImage,
            stockImageName,
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

    const search = async () => {
        const response = await axios.get("http://localhost:4000/api/stock") 
        console.log(response)
    }
    
    return (
        <Contents>
            <h1>상품등록</h1>
            <form className={styles.register_form} onSubmit={submit} >
                <TextField
                    placeholder="상품명"
                    id="outlined-basic" 
                    label="상품명" 
                    variant="outlined"
                    type="text"
                    onChange={(e) => setStockName(e.target.value)}
                />
                <TextField
                    placeholder="상품가격"
                    id="outlined-basic" 
                    label="상품가격" 
                    variant="outlined"
                    type="number"
                    onChange={(e) => setStockPrice(e.target.value)}
                />
                <TextField
                    placeholder="상품갯수"
                    id="outlined-basic" 
                    label="상품갯수" 
                    variant="outlined"
                    type="number"
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


            <Button variant="contained" color="primary" onClick={search} >
                상품 조회
            </Button>
        </Contents>
    )
}
