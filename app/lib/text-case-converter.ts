function toTitleCase(sentence: string) {
  return sentence.toLowerCase().split(' ')
    .map((word) => { return (word.charAt(0).toUpperCase() + word.slice(1)); })
    .join(' ');
}

export { toTitleCase };
