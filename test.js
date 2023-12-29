const axios = require('axios');
const fs = require('fs');

const API_KEY = 'AIzaSyDQuR81pUVkVw6iHEY9bpRadyu4SrWYmuI'; // 여기에 생성한 API 키 입력
const CX = 'b0e81c73f3a8e4153'; // 여기에 검색 엔진 ID 입력
const QUERY_KEYWORDS = ['@jsh1010', 'board/bbs/board.php?bo_table=free_board']; // 검색하고자 하는 키워드
const OUTPUT_FILE = 'results.txt'; // 결과를 저장할 파일명
const NUM_PAGES = 10; // 조회할 페이지 수

async function fetchSearchResults(query) {
  const response = await axios.get(
    'https://www.googleapis.com/customsearch/v1',
    {
      params: {
        key: API_KEY,
        cx: CX,
        q: query,
      },
    },
  );

  return response.data.items.map((item) => item.link);
}

async function searchForKeywords() {
  let uniqueUrls = new Set();

  for (const query of QUERY_KEYWORDS) {
    try {
      const urls = await fetchSearchResults(query);

      // 중복된 URL 제거하고 파일에 쓰기
      urls.forEach((url) => {
        if (!uniqueUrls.has(url)) {
          fs.appendFileSync(OUTPUT_FILE, url + '\n', 'utf8');
          uniqueUrls.add(url);
        }
      });
    } catch (error) {
      console.error(`Error while searching for '${query}': `, error);
    }
  }

  console.log(`URLs have been written to ${OUTPUT_FILE}`);
}

searchForKeywords();
