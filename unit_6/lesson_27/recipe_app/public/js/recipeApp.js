$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get("/api/courses", (results = {}) => { //check data object contains course information
      let data = results.data;
      if (!data || !data.courses) return;
      data.courses.forEach(course => { //loop through course data, add elements to modal
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<button class='button ${course.joined ? "joined-button" : "join-button"}' data-id="${course._id}">
							${course.joined ? "Joined" : "Join"}
						</button> 
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        ); //add join button
      });
    }).then(() => {
      addJoinButtonListener(); //add event listener to the buttons after AJAX request completes
    });
  });
});

let addJoinButtonListener = () => { //create event listener for modal button
  $(".join-button").click(event => {
    let $button = $(event.target),
      courseId = $button.data("id"); //grab button ID data
    $.get(`/api/courses/${courseId}/join`, (results = {}) => { //make AJAX request with the course's ID to join
      let data = results.data;
      if (data && data.success) { //checks whether the join action was a success, and modify the button
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};
