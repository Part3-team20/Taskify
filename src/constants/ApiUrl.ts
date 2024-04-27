// fetch 할때 사용하는 url을 정의해서 사용합니다.
const BASE_URL = 'https://sp-taskify-api.vercel.app/4-20';

// 회원가입
const SIGNIN = `${BASE_URL}/users`;

// 로그인
const LOGIN = `${BASE_URL}/auth/login`;

// 비밀번호 변경
const CHANGE_PASSWORD = `${BASE_URL}/auth/password`;

// 내 정보
const USERS = `${SIGNIN}/me`;

// 프로필 이미지 업로드
const PROFILE = `${USERS}/image`;

// 대시보드
const DASHBOARDS = `${BASE_URL}/dashboards`;

// 컬럼
const COLUMNS = `${BASE_URL}/columns`;

// 댓글
const COMMENTS = `${BASE_URL}/comments`;

// 초대
const INVITATIONS = `${BASE_URL}/invitations`;

// 대시보드 멤머
const MEMBERS = `${BASE_URL}/members`;

// 카드
const CARDS = `${BASE_URL}/cards`;

export { SIGNIN, LOGIN, CHANGE_PASSWORD, USERS, PROFILE, DASHBOARDS, COLUMNS, COMMENTS, INVITATIONS, MEMBERS, CARDS };

// 쿼리파라미터나 패스 파라미터는 추가하지 않고 기존 파일에서 쓰는게 날거같아 추가하지 않았습니
// `${COLUMNS}?dashboardId=${boardId}`;
