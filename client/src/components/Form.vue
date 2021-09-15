<template>
    <div>
        <h1>{{ type }}</h1>
        <form>
            <div class="form-control">
                <label for="email">Email</label>
                <input type="email" name="email" placeholder="Email" />
            </div>
            <div class="form-control">
                <label for="password">Password</label>
                <input type="password" name="password" placeholder="Password" />
            </div>
            <div class="form-control submit">
                <input type="submit" value="Submit" />
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Form",
        props: {
            type: String,
        }
    }
</script>

<style scoped>
h1 {
    width:100%;
    height:75px;
    text-align: center;
    line-height: 75px;
    margin-bottom: 25px;
}
form {
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 480px;
    margin:0 auto;
    height:fit-content;
    padding:25px 50px;
}
.form-control, .submit {
    width:100%;
    height:50px;
    display:grid;
    grid-template-columns: auto 1fr;
    gap:15px;
    align-items: center;
    justify-content: space-between;
}
.form-control input {
    height:75%;
    padding:10px;
    outline:none;
    border:none;
    background-color: rgb(148, 141, 141);
    color:rgb(235, 235, 235);
    font-size: 15px;
    transition:0.2s ease;
}
.form-control input:focus {
    border:3px solid steelblue;
}
.submit {
    display:flex;
    align-items: center;
    width:100%;
    margin-top: 25px;
}
.submit input {
    width:100%;
    cursor: pointer;
    background-color: steelblue;
}
</style>