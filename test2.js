const puppeteer = require('puppeteer');

async function postArticle(url, title, content) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // 로그인 프로세스가 필요한 경우 여기에 추가

  // 글 작성 폼에 내용을 입력합니다.
  await page.type('input[name=title]', title);
  await page.type('textarea[name=content]', content);

  // 글을 제출합니다.
  await page.click('button[type=submit]');

  await browser.close();
}

// 사용 예시
postArticle(
  'http://nanumsma.or.kr/bbs/board.php?bo_table=sub55',
  'http://nanumsma.or.kr/bbs/board.php?bo_table=sub55',
  'http://nanumsma.or.kr/bbs/board.php?bo_table=sub55http://nanumsma.or.kr/bbs/board.php?bo_table=sub55http://nanumsma.or.kr/bbs/board.php?bo_table=sub55http://nanumsma.or.kr/bbs/board.php?bo_table=sub55http://nanumsma.or.kr/bbs/board.php?bo_table=sub55',
);
