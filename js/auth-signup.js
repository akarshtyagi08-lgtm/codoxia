document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm") || document.querySelector("form");

  if (!signupForm) return;

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName")?.value.trim();
    const lastName = document.getElementById("lastName")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value;
    const submitBtn = signupForm.querySelector("button[type='submit']");

    if (!email || !password || !firstName || !lastName) {
      alert("Please fill in all fields! ⚠️");
      return;
    }

    if (submitBtn) submitBtn.disabled = true;

    try {
      // 1. Sign up user with Supabase Auth
      const { data, error } = await window.supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: { first_name: firstName, last_name: lastName }
        }
      });

      if (error) throw error;

      // 2. Insert profile record into public.profiles
      if (data?.user) {
        const { error: profileError } = await window.supabaseClient
          .from("profiles")
          .insert([
            {
              id: data.user.id,
              first_name: firstName,
              last_name: lastName,
              email: email
            }
          ]);

        if (profileError) console.error("Profile creation warning:", profileError.message);
      }

      alert("Account created successfully! 🎉 Check your email for confirmation link.");
      window.location.href = "login.html";
    } catch (err) {
      alert("Signup failed: " + err.message);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});
