과제 테스트

백엔드와 프론트엔드 모두 Next.js를 사용하여 구현했습니다.

### 기술 스택
- Next.js: 15.1.7
- Typescript: 5
- tailwindcss: 4.0.6
- tanstack/react-query: 5.66.2
- mongodb

### 설치 방법
1. 프로젝트를 클론합니다.
```
git clone https://github.com/BellPumpkin/test.git
```

2. 프로젝트 디렉토리로 이동합니다.
```
cd test
```

3. 필요한 의존성 패키지를 설치합니다.
```
npm install
```

4. .env 파일에 환경 변수 설정이 필요합니다.
```
MONGODB_URI=your_mongodb_uri
```
5. 로컬 서버를 시작합니다.
```
npm run dev
```
6. 브라우저에서 http://localhost:3000 에 접속하여 앱을 확인합니다.

### 기능
1. 책 목록 보기
   - 백엔드 API를 호출하여 책 목록을 보여줍니다.
   - 각 페이지에서 10개의 항목을 보여줍니다.
   - 페이지네이션 기능을 통해 다른 페이지에 접근할 수 있습니다.
    
2. 새로운 책 추가하기
   - 새로운 책을 추가할 수 있는 버튼이 있습니다.
   - 책 추가 화면에서 제목, 내용, 저자, 가격, 권수 등을 입력하여 책을 추가합니다.
    
3. 책 제목 검색
   - 책 제목을 통해 원하는 책을 검색할 수 있는 기능이 있습니다.

4. 책 상세 정보 확인하기
   - 책 목록 페이지에서 책 제목을 클릭하면 해당 책 상세 페이지로 이동합니다.
   - 상세 페이지에서 제목, 내용, 저자, 가격, 권수를 확인할 수 있습니다. ( 이미지는 구현하지 못했습니다. )
    
5. 책 정보 수정하기
   - 책 목록 페이지에서 o 버튼을 클릭하면 해당 책 정보를 수정할 수 있는 페이지로 이동합니다.
   - 수정 페이지에서 제목, 내용, 저자, 가격, 권수를 수정할 수 있습니다.

6. 책 삭제하기
   - 책 목록 페이지에서 x 버튼을 클릭하면 해당 책을 목록에서 삭제합니다.
