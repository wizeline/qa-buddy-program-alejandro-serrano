const faker = require('faker');

/**
 * Generate random names for the given number of tasks.
 *
 * @param {number} numberOfTasks
 */
function generateTasks(numberOfTasks) {
    let tasks = [];

    for (let index = 1; index <= numberOfTasks; index++) {
        let taskName = faker.lorem.words(4);
        tasks.push({
            'id': index,
            'task_description': taskName,
        });
    }

    return tasks;
}

export { generateTasks };