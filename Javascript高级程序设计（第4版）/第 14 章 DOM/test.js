let observer = new MutationObserver((mutationRecords, mutationObserver) => console.log(mutationRecords, mutationObserver));
observer.observe(document.body, {
    attributes: true
});
document.body.className = 'foo'; // [MutationRecord], MutationObserver