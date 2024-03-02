import React from 'react';
import { answerType } from '../options/main';
import download from '@/assets/img/download.png'
import s from './main.module.scss'
import Papa from 'papaparse';

const Download = () => {
  const existingAnswersString = localStorage.getItem('quizAnswers');
  const data = existingAnswersString ? JSON.parse(existingAnswersString) : []
  const handleDownload = () => {
    // Получаем данные из localStorage



    // Создаем массив данных для CSV
    let htmlContent = '<style>table {border-collapse: collapse;} th, td {border: 1px solid black; padding: 8px;}</style>';
    htmlContent += '<table><tr><th>Order</th><th>Title</th><th>Type</th><th>Answer</th></tr>';

    data.forEach((item: any) => {
      let answer = item.answer;
      if (typeof answer !== 'string') {
        // Если ответ является массивом, формируем строки для каждого элемента массива
        answer = answer.map((ans: any) => `${ans.text}`).join(', ');
        answer = `${answer}`;
      }

      htmlContent += `<tr><td>${item.order}</td><td>${item.title}</td><td>${item.type}</td><td>${answer}</td></tr>`;
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
