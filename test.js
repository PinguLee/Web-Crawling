const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio'); // HTML 파싱을 위해 cheerio 라이브러리 사용

const URL_FILE = 'results.txt'; // URL이 저장된 파일명
const GNUBOARD_WRITE_URL = 'https://example.com/board/write.php'; // 그누보드 글 작성 URL

// 그누보드에 글을 작성하는 함수
async function postToGnuboard(title, content) {
  try {
    const response = await axios.post(GNUBOARD_WRITE_URL, {
      // 이 부분은 그누보드의 폼 데이터에 맞게 수정해야 합니다.
      board: 'your_board_name', // 게시판 이름
      title: title, // 글 제목
      content: content, // 글 내용
      // 필요한 추가 데이터 (인증 토큰, 쿠키 등)
    });

    return response.data;
  } catch (error) {
    console.error('Error posting to Gnuboard: ', error);
  }
}

// URL 파일을 읽어서 각 URL에서 데이터를 추출하고, 그누보드에 글 작성
async function readUrlsAndPost() {
  const urls = fs.readFileSync(URL_FILE, 'utf8').split('\n');
  
  for (const url of urls) {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);

      // 여기에서 필요한 데이터를 추출합니다. 예를 들면:
      const title = $('h1').text(); // 제목 추출 예시
      const content = $('#content').text(); // 내용 추출 예시

      // 추출한 데이터로 그누보드에 글 작성
      await postToGnuboard(title, content);
    } catch (error) {
      console.error(`Error processing URL ${url}: `, error);
    }
  }
}

readUrlsAndPost();
