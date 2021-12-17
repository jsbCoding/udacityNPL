function updateResult(result, content){
    result.innerHTML = `${result.confidence}<br>${result.score}<br>${result.subjectivity}<br> ${result.irony}`
}
export { updateResult };
