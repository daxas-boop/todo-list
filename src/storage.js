export function populateStorage(projects) {
    localStorage.setItem('projects', JSON.stringify(projects))
}

export function getStorage() {
    let retrievedProjects = localStorage.getItem('projects');
    retrievedProjects = JSON.parse(retrievedProjects);
    return retrievedProjects;
}
