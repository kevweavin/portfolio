// function showTab(tabType) {
//     const elementorTab = document.querySelector('.elementor-tab');
//     const oxygenTab = document.querySelector('.oxygen-tab');
  
//     if (tabType === 'elementor') {
//       elementorTab.style.display = 'grid';
//       oxygenTab.style.display = 'none';
//     } else if (tabType === 'oxygen') {
//       elementorTab.style.display = 'none';
//       oxygenTab.style.display = 'grid';
//     }
//   }
  

function showTab(tabType) {
    const elementorTab = document.querySelector('.elementor-tab');
    const oxygenTab = document.querySelector('.oxygen-tab');
  
    // Toggle active class on tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
  
    if (tabType === 'elementor') {
      elementorTab.style.display = 'grid';
      oxygenTab.style.display = 'none';
      document.querySelector('.elementor-btn').classList.add('active');
    } else if (tabType === 'oxygen') {
      elementorTab.style.display = 'none';
      oxygenTab.style.display = 'grid';
      document.querySelector('.oxygen-btn').classList.add('active');
    }
  }
  
  // Add click event listeners to toggle buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove 'active' class from all buttons
      document.querySelectorAll('.tab-btn').forEach(innerBtn => {
        innerBtn.classList.remove('active');
      });
  
      // Add 'active' class to the clicked button
      this.classList.add('active');
    });
  });
  
  