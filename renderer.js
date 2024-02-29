// renderer.js 파일 내용 생략

document.addEventListener('DOMContentLoaded', () => {
  const countDisplay = document.getElementById('count'); // 숫자를 표시할 요소
  const incrementButton = document.getElementById('increment-count'); // 증가 버튼
  const resetButton = document.getElementById('reset-count'); // 초기화 버튼

  let count = 0; // 초기 카운트 값

  // 증가 버튼 클릭 이벤트 핸들러
  incrementButton.addEventListener('click', () => {
    count++; // 숫자 증가
    countDisplay.textContent = count; // 화면에 숫자 업데이트
  });

  // 초기화 버튼 클릭 이벤트 핸들러
  resetButton.addEventListener('click', () => {
    count = 0; // 숫자 초기화
    countDisplay.textContent = count; // 화면에 숫자 업데이트
  });

  const information = document.getElementById('info');
  information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

  document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    const isDarkMode = await window.darkMode.toggle();
    document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light';
  });

  document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system();
    document.getElementById('theme-source').innerHTML = 'System';
  });

});
