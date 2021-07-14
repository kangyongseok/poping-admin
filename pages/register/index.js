import React from 'react'
import TextField from '@material-ui/core/TextField';
import Contents from '@/components/Contents';
import styles from './Register.module.scss';

export default function Register() {
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
                <label htmlFor="img_upload">이미지 업로드</label>
                <input id="img_upload" type="file"/>
            </form>
        </Contents>
    )
}
