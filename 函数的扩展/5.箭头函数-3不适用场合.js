// 箭头函数使得this从“动态”变成“静态”
// 第一个场合是定义对象的方法，且该方法内部包括this。

const cat = {
    lives: 9,
    jumps: () => {
      this.lives--;
    }
  }
// this指向全局对象，因此不会得到预期结果

/*============================================================*/
// 第二个场合是需要动态this的时候，也不应使用箭头函数。

var button = document.getElementById('press');
button.addEventListener('click', () => {
  this.classList.toggle('on');
});


