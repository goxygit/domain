'use client'
import React from 'react';
import { answerType } from '../options/main';
import download from '@/assets/img/download.png'
import s from './main.module.scss'
import Papa from 'papaparse';

const Download = () => {
  // Получаем данные из localStorage

  const existingAnswersString = localStorage.getItem('quizAnswers');
  const data = existingAnswersString ? JSON.parse(existingAnswersString) : []
  const handleDownload = () => {
    let htmlContent = '<style>table {border-collapse: collapse; font-family: sans-serif;} th, td {border: 0.5px solid gray; padding: 8px;} th{background-color:lightgray}</style>';
    htmlContent += '<table><tr><th><b>Order</b></th><th><b>Title</b></th><th><b>Type</b></th><th><b>Answer</b></th></tr>';

    data.forEach((item: any) => {
      let answer = item.answer;
      if (typeof answer !== 'string') {
        // Если ответ является массивом, формируем строки для каждого элемента массива
        answer = answer.map((ans: any) => `${ans.text}`).join(', ');
        answer = `${answer}`;
      }

      htmlContent += `<tr><th><b>${item.order}</b></th><td>${item.title}</td><td>${item.type}</td><td>${answer}</td></tr>`;
    });

    htmlContent += '</table>';


    // Создаем и загружаем файл HTML
    const encodedUri = encodeURI('data:text/html;charset=utf-8,' + htmlContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'data.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (

    <div onClick={handleDownload}>
      <img src={download.src} alt="" />
      Downloads my answers
    </div>
  );
};

export default Download;
