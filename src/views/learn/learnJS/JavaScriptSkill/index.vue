<template>
  <el-card>
    <template #header>防抖</template>
    <p><strong>JavaScript防抖</strong>是一种用于优化函数执行的技术。</p>
    <ol>
      <li>防抖的主要目的是在函数被频繁触发时，通过延迟函数执行来减少不必要的重复操作。</li>
      <li>
        防抖的实现方式是设置一个定时器，在函数被触发后，如果在指定的时间间隔内再次触发该函数，则清除之前的定时器并重新设置新的定时器。只有当函数在指定的时间间隔内没有再次被触发时，才会执行函数。
      </li>
    </ol>
    <p> 这种技术在处理一些频繁触发的事件中非常有用，例如窗口调整大小、滚动事件等。通过使用防抖，可以减少不必要的函数执行次数，提升性能和用户体验。
      以下是一个使用JavaScript实现的简单防抖函数的示例：</p>
    <pre><code class="language-javascript">
      function debounce(func, delay) {
        let timer;
        return function() {
          clearTimeout(timer);
          timer = setTimeout(() =&gt; {
            func.apply(this, arguments);
          }, delay);
        };
      }
      // 使用防抖函数包装需要执行的函数
      const debouncedFunction = debounce(myFunction, 300);
      // 在事件触发时调用防抖函数
      element.addEventListener(&#39;scroll&#39;, debouncedFunction);
      </code></pre>
    <p>在上面的示例中， <code>debounce</code> 函数接受一个需要执行的函数和延迟时间作为参数，并返回一个新的函数。这个新函数使用
      <code>setTimeout</code> 来延迟函数的执行，并在指定的延迟时间内清除之前的定时器。通过将需要执行的函数作为参数传递给
      <code>func.apply</code> ，可以确保函数在正确的上下文中执行。
      请注意，上述示例只是一个简单的防抖函数实现，并且可能需要根据具体的使用场景进行适当的调整和改进。</p>
  </el-card>
  <br>
  <el-card>
    <template #header>节流</template>
    <p><strong>JavaScript节流</strong>是一种用于优化函数执行的技术。</p>
    <ol>
      <li>与防抖不同，节流的主要目的是在函数被频繁触发时，通过限制函数的执行频率来减少函数的调用次数。</li>
      <li>
        节流的实现方式是设置一个时间间隔，当函数被触发时，只有在指定的时间间隔内未执行函数时，才会执行函数。如果在时间间隔内再次触发函数，函数将被忽略，直到时间间隔过去后才能再次执行。
      </li>
    </ol>
    <p>这种技术在处理一些高频触发的事件中非常有用，例如鼠标移动事件、滚动事件等。通过使用节流，可以确保函数在一定时间间隔内只执行一次，从而减少函数的执行次数，提高性能和响应性。
      以下是一个使用JavaScript实现的简单节流函数的示例：</p>
    <pre><code class="language-javascript">
      function throttle(func, delay) {
        let timer;
        return function() {
          if (!timer) {
            timer = setTimeout(() =&gt; {
              func.apply(this, arguments);
              timer = null;
            }, delay);
          }
        };
      }
      // 使用节流函数包装需要执行的函数
      const throttledFunction = throttle(myFunction, 300);
      // 在事件触发时调用节流函数
      element.addEventListener(&#39;scroll&#39;, throttledFunction);
      </code></pre>
    <p>在上面的示例中， <code>throttle</code> 函数接受一个需要执行的函数和时间间隔作为参数，并返回一个新的函数。这个新函数使用
      <code>setTimeout</code> 来延迟函数的执行，并通过设置和清除 <code>timer</code> 变量来控制函数的执行频率。
      请注意，上述示例只是一个简单的节流函数实现，并且可能需要根据具体的使用场景进行适当的调整和改进。</p>

  </el-card>
</template>

<script setup>
</script>

<style scoped>
pre {
  background-color: #2c3e50;
  color: #f1fff5;
}
</style>