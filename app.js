document.addEventListener('DOMContentLoaded', () => {

    // --- Modal Logic ---
    const warningModalElement = document.getElementById('warningModal');
    const modalBody = warningModalElement.querySelector('.scrollable-modal-body');
    const confirmReadBtn = document.getElementById('confirmReadBtn');
  
    // Instantiate and show the modal immediately
    const warningModal = new bootstrap.Modal(warningModalElement, {
      backdrop: 'static', // Prevent closing by clicking outside
      keyboard: false     // Prevent closing with Esc key
    });
  
    // Use a slight delay before showing the modal to ensure everything is rendered
    setTimeout(() => {
      warningModal.show();
    }, 100);
  
  
    // Check if the user has scrolled to the bottom of the modal body
    modalBody.addEventListener('scroll', () => {
      // Allow a small buffer for floating point inaccuracies
      const buffer = 5;
      const isScrolledToBottom = modalBody.scrollHeight - modalBody.scrollTop <= modalBody.clientHeight + buffer;
  
      if (isScrolledToBottom) {
        confirmReadBtn.disabled = false; // Enable the button
      } else {
        confirmReadBtn.disabled = true; // Disable the button
      }
    });
  
    // Hide the modal when the confirm button is clicked
    confirmReadBtn.addEventListener('click', () => {
      warningModal.hide();
    });
  
  
    // --- Reading Progress Bar Logic ---
    const progressBar = document.getElementById('progressBar');
  
    window.addEventListener('scroll', () => {
      // Get the total height of the document that can be scrolled
      const totalScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
      // Get the current scroll position from the top
      const currentScrollTop = document.documentElement.scrollTop;
  
      // Calculate the scroll progress percentage
      // Prevent division by zero if the page is not scrollable
      const scrollProgress = totalScrollHeight > 0 ? (currentScrollTop / totalScrollHeight) * 100 : 0;
  
      // Update the width of the progress bar
      progressBar.style.width = scrollProgress + '%';
    });
  
    // Trigger initial progress update in case the page loads with some scroll (e.g., refresh)
    window.dispatchEvent(new Event('scroll'));
  
  });