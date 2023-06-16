let roadmap;
let canvasWidth = 800;
let canvasHeight = 600;
const boxMargin = 20;
const labelMargin = 5;

export function preload() {
    roadmap = {
        start: "01/06/2023",
        end: "07/06/2023",
        activities: [
            {
                name: "Activity 1",
                description: "Description of Activity 1",
                start: "01/06/2023",
                end: "02/06/2023",
                image: loadImage("../images/img.png")
            },
            {
                name: "Activity 2",
                description: "Description of Activity 2",
                start: "02/06/2023",
                end: "05/06/2023",
                image: loadImage("../images/img.png")
            },
            {
                name: "Activity 3",
                description: "Description of Activity 3",
                start: "05/06/2023",
                end: "07/06/2023",
                image: loadImage("../images/img.png")
            },
            {
                name: "Activity 4",
                description: "Description of Activity 4",
                start: "03/06/2023",
                end: "06/06/2023",
                image: loadImage("../images/img.png")
            }
        ]
    };
}

function setup() {
    // Adjust the canvas size based on the activities
    let latestEndDate = new Date(roadmap.start);
    roadmap.activities.forEach(activity => {
        let endDate = new Date(activity.end);
        if (endDate > latestEndDate) {
            latestEndDate = endDate;
        }
    });

    canvasWidth = Math.max(canvasWidth, map(latestEndDate, new Date(roadmap.start), new Date(roadmap.end), 0, width) + 2 * boxMargin);

    createCanvas(canvasWidth, canvasHeight);
}

function draw() {
    background(240);

    // Calculate the height and position of each activity box
    let boxHeight = height / 2;

    // Convert start and end dates to JavaScript Date objects
    let startDate = new Date(roadmap.start);
    let endDate = new Date(roadmap.end);

    // Draw the timeline arrow
    let arrowHeight = height - 50;
    let arrowStartX = 50;
    let arrowEndX = width - 50;
    let arrowY = height - 20;

    // Draw the arrow line
    stroke(0);
    line(arrowStartX, arrowY, arrowEndX, arrowY);

    // Draw the arrow triangle
    let arrowSize = 10;
    fill(0);
    triangle(arrowEndX, arrowY, arrowEndX - arrowSize, arrowY - arrowSize, arrowEndX - arrowSize, arrowY + arrowSize);

    // Draw the activity boxes and labels
    for (let i = 0; i < roadmap.activities.length; i++) {
        let activity = roadmap.activities[i];

        // Convert activity start and end dates to JavaScript Date objects
        let activityStartDate = new Date(activity.start);
        let activityEndDate = new Date(activity.end);

        // Convert start and end dates to numeric values
        let startValue = activityStartDate.getTime();
        let endValue = activityEndDate.getTime();

        // Calculate the duration of the activity in milliseconds
        let activityDuration = endValue - startValue;

        // Calculate the width of the activity box based on the duration
        let boxWidth = map(activityDuration, 0, endDate.getTime() - startDate.getTime(), 0, width) - 2 * boxMargin;

        // Calculate the position of the activity box
        let x = map(startValue, startDate.getTime(), endDate.getTime(), arrowStartX, arrowEndX) + boxMargin;
        let y = height / 4;

        // Check if the activity overlaps with previous activities
        for (let j = 0; j < i; j++) {
            let prevActivity = roadmap.activities[j];
            let prevStartDate = new Date(prevActivity.start).getTime();
            let prevEndDate = new Date(prevActivity.end).getTime();

            if (
                (startValue >= prevStartDate && startValue < prevEndDate) ||
                (endValue > prevStartDate && endValue <= prevEndDate)
            ) {
                // Adjust the position of the current activity box to avoid overlap
                let prevBoxX = map(prevStartDate, startDate.getTime(), endDate.getTime(), arrowStartX, arrowEndX) + boxMargin;
                let prevBoxWidth = map(prevEndDate - prevStartDate, 0, endDate.getTime() - startDate.getTime(), 0, width) - 2 * boxMargin;
                x = prevBoxX + prevBoxWidth + boxMargin;
            }
        }

        // Draw the activity box
        fill(255, 200, 200);
        rect(x, y, boxWidth, boxHeight);

        // Draw the activity image
        if (activity.image) {
            image(activity.image, x, y, boxWidth, boxHeight);
        }

        // Draw the activity name and description
        fill(0);
        textSize(14);
        textAlign(LEFT, CENTER);
        text(activity.name, x + 10, y + 20);
        textSize(12);
        textAlign(LEFT, TOP);
        text(activity.description, x + 10, y + 30, boxWidth - 20);

        // Draw the start and end date labels
        let startDateLabelY, endDateLabelY;

        if (i % 2 === 0) {
            // Place the start date label below the activity box
            startDateLabelY = y + boxHeight + labelMargin;
            endDateLabelY = y + boxHeight + labelMargin + 15;
        } else {
            // Place the start date label above the activity box
            startDateLabelY = y - labelMargin - 15;
            endDateLabelY = y - labelMargin;
        }

        textSize(12);
        textAlign(CENTER);
        text(activity.start, x + boxWidth / 2, startDateLabelY);
        text(activity.end, x + boxWidth / 2, endDateLabelY);
    }

    // Draw the start and end date labels for the entire roadmap
    textSize(12);
    textAlign(CENTER);
    text(roadmap.start, arrowStartX, arrowY + 40);
    text(roadmap.end, arrowEndX, arrowY + 40);

    // Save the canvas as an image
    saveCanvas("roadmap", "png");
}
