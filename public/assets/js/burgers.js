// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".devour").on("click", async function(event) {
    const id = $(this).data("id");
    const devoured = !$(this).data("devoured");

    // Send the PUT request.
    await $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: {
        devoured
      }
    });

    console.log("changed devoured to", devoured);
    // Reload the page to get the updated list
    location.reload();
  });

  $(".create-form").on("submit", async function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    const burger_name = $("#burger_name").val().trim();
    const devoured = $("[name=devoured]:checked").val().trim();
    // Send the POST request.
    await $.ajax("/api/burgers/", {
      type: "POST",
      data: {
        burger_name, 
        devoured
      }
    });
    console.log("created new burger");
    // Reload the page to get the updated list
    location.reload();
  });
});
