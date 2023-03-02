using LoginAPI.Context;
using LoginAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoginAPI.Controllers
{
    // Define the base URL route for the controller
    [Route("api/[controller]")]
    [ApiController]

    // Controller to handle user-related requests
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authContext;

        // Constructor to inject AppDbContext
        public UserController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
        }

        // API endpoint for user authentication
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userObj)
        {
            // Check if the request body is empty
            if (userObj == null)
                return BadRequest();

            // Find the user from the database
            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Email == userObj.Email && x.Password == userObj.Password);

            // Return not found error if user not found
            if (user == null)
                return NotFound(new { Meessage = "User Not Found!" });

            // Return success message if login is successful
            return Ok(new
            {
                Message = "Login Success!"
            });
        }

        // API endpoint for user registration
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            // Check if the request body is empty
            if (userObj == null)
                return BadRequest();

            // Add the user to the database
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();

            // Return success message if user is registered successfully
            return Ok(new
            {
                Message = "User Registered"
            });
        }
    }
}
