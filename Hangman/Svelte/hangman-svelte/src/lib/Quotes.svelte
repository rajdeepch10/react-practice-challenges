<script>
  let quote = null;
  const fetchQuotes = async () => {
    const response = await fetch("https://api.quotable.io/random").then((res) =>
      res.json()
    );
    quote = response.content;
  };
</script>

<article style="border: 1px solid orange;border-radius: 2rem;padding:2rem;">
  {quote === null ? "No Fetched Quotes!" : quote}
</article>
<br />

<button on:click={fetchQuotes}> Fetch Quotes </button>
