// Helper function for animations
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Bubble Sort
export async function bubbleSort(arr, updateVisual, delay, onMetricsUpdate) {
  const n = arr.length;
  const colorStates = Array(n).fill('unsorted');
  let comparisons = 0;
  let swaps = 0;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Mark elements being compared
      colorStates[j] = 'compare';
      colorStates[j + 1] = 'compare';
      comparisons++;
      onMetricsUpdate?.(comparisons, swaps);
      updateVisual([...arr], [...colorStates], true, false, [], -1);
      await sleep(delay);
      
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        onMetricsUpdate?.(comparisons, swaps);
        updateVisual([...arr], [...colorStates], true, true, [j, j + 1], -1);
        await sleep(delay);
      }
      
      // Reset colors
      colorStates[j] = 'unsorted';
      colorStates[j + 1] = 'unsorted';
    }
    
    // Mark as sorted
    colorStates[n - i - 1] = 'sorted';
    updateVisual([...arr], [...colorStates], false, false, [], -1);
  }
  
  // Mark first element as sorted
  colorStates[0] = 'sorted';
  updateVisual([...arr], [...colorStates], false, false, [], -1);
  
  return arr;
}

// Selection Sort
export async function selectionSort(arr, updateVisual, delay, onMetricsUpdate) {
  const n = arr.length;
  const colorStates = Array(n).fill('unsorted');
  let comparisons = 0;
  let swaps = 0;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    colorStates[minIdx] = 'selected';
    updateVisual([...arr], [...colorStates], false, false, [], -1);
    await sleep(delay);
    
    for (let j = i + 1; j < n; j++) {
      colorStates[j] = 'compare';
      comparisons++;
      onMetricsUpdate?.(comparisons, swaps);
      updateVisual([...arr], [...colorStates], true, false, [], -1);
      await sleep(delay);
      
      if (arr[j] < arr[minIdx]) {
        colorStates[minIdx] = 'unsorted';
        minIdx = j;
        colorStates[minIdx] = 'selected';
        updateVisual([...arr], [...colorStates], false, false, [], -1);
        await sleep(delay);
      } else {
        colorStates[j] = 'unsorted';
      }
    }
    
    if (minIdx !== i) {
      colorStates[i] = 'compare';
      updateVisual([...arr], [...colorStates], false, false, [], -1);
      await sleep(delay);
      
      // Swap
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;
      onMetricsUpdate?.(comparisons, swaps);
      colorStates[minIdx] = 'unsorted';
      updateVisual([...arr], [...colorStates], false, true, [i, minIdx], -1);
      await sleep(delay);
    }
    
    colorStates[i] = 'sorted';
    updateVisual([...arr], [...colorStates], false, false, [], -1);
  }
  
  colorStates[n - 1] = 'sorted';
  updateVisual([...arr], [...colorStates], false, false, [], -1);
  
  return arr;
}

// Insertion Sort
export async function insertionSort(arr, updateVisual, delay, onMetricsUpdate) {
  const n = arr.length;
  const colorStates = Array(n).fill('unsorted');
  let comparisons = 0;
  let swaps = 0;
  
  colorStates[0] = 'sorted';
  updateVisual([...arr], [...colorStates], false, false, [], -1);
  await sleep(delay);
  
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    
    colorStates[i] = 'selected';
    updateVisual([...arr], [...colorStates], false, false, [], -1);
    await sleep(delay);
    
    while (j >= 0 && arr[j] > key) {
      colorStates[j] = 'compare';
      comparisons++;
      onMetricsUpdate?.(comparisons, swaps);
      updateVisual([...arr], [...colorStates], true, false, [], -1);
      await sleep(delay);
      
      arr[j + 1] = arr[j];
      swaps++;
      onMetricsUpdate?.(comparisons, swaps);
      colorStates[j] = 'selected';
      colorStates[j + 1] = 'compare';
      updateVisual([...arr], [...colorStates], false, true, [], -1);
      await sleep(delay);
      
      colorStates[j + 1] = 'sorted';
      j--;
    }
    
    arr[j + 1] = key;
    colorStates[j + 1] = 'sorted';
    updateVisual([...arr], [...colorStates], false, false, [], -1);
  }
  
  return arr;
}

// Merge Sort
export async function mergeSort(arr, left, right, updateVisual, delay, onMetricsUpdate, metrics = { comparisons: 0, swaps: 0 }) {
  const colorStates = Array(arr.length).fill('unsorted');
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid, updateVisual, delay, onMetricsUpdate, metrics);
    await mergeSort(arr, mid + 1, right, updateVisual, delay, onMetricsUpdate, metrics);
    await merge(arr, left, mid, right, updateVisual, delay, onMetricsUpdate, colorStates, metrics);
  }
  return arr;
}

async function merge(arr, left, mid, right, updateVisual, delay, onMetricsUpdate, colorStates, metrics) {
  const n1 = mid - left + 1;
  const n2 = right - mid;
  const L = new Array(n1);
  const R = new Array(n2);
  for (let i = 0; i < n1; i++) {
    L[i] = arr[left + i];
    colorStates[left + i] = 'left';
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j];
    colorStates[mid + 1 + j] = 'right';
  }
  updateVisual([...arr], [...colorStates]);
  await sleep(delay);
  let i = 0, j = 0, k = left;
  while (i < n1 && j < n2) {
    await sleep(delay);
    metrics.comparisons++;
    onMetricsUpdate?.(metrics.comparisons, metrics.swaps);
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
      metrics.swaps++;
      onMetricsUpdate?.(metrics.comparisons, metrics.swaps);
    }
    colorStates[k] = 'selected';
    updateVisual([...arr], [...colorStates]);
    k++;
  }
  while (i < n1) {
    await sleep(delay);
    arr[k] = L[i];
    colorStates[k] = 'selected';
    updateVisual([...arr], [...colorStates]);
    i++;
    k++;
  }
  while (j < n2) {
    await sleep(delay);
    arr[k] = R[j];
    colorStates[k] = 'selected';
    updateVisual([...arr], [...colorStates]);
    j++;
    k++;
  }
  if (left === 0 && right === arr.length - 1) {
    for (let i = left; i <= right; i++) colorStates[i] = 'sorted';
  } else {
    for (let i = left; i <= right; i++) colorStates[i] = 'unsorted';
  }
  updateVisual([...arr], [...colorStates]);
  await sleep(delay);
}

// Quick Sort
export async function quickSort(arr, low, high, updateVisual, delay, onMetricsUpdate, metrics = { comparisons: 0, swaps: 0 }) {
  const colorStates = Array(arr.length).fill('unsorted');
  if (low < high) {
    const pi = await partition(arr, low, high, updateVisual, delay, onMetricsUpdate, colorStates, metrics);
    await quickSort(arr, low, pi - 1, updateVisual, delay, onMetricsUpdate, metrics);
    for (let i = low; i <= pi; i++) colorStates[i] = 'sorted';
    updateVisual([...arr], [...colorStates]);
    await quickSort(arr, pi + 1, high, updateVisual, delay, onMetricsUpdate, metrics);
    for (let i = pi + 1; i <= high; i++) colorStates[i] = 'sorted';
    updateVisual([...arr], [...colorStates]);
  }
  if (low === 0 && high === arr.length - 1) await sleep(delay);
  return arr;
}

async function partition(arr, low, high, updateVisual, delay, onMetricsUpdate, colorStates, metrics) {
  const pivot = arr[high];
  colorStates[high] = 'selected';
  updateVisual([...arr], [...colorStates]);
  await sleep(delay);
  let i = low - 1;
  for (let j = low; j <= high - 1; j++) {
    await sleep(delay);
    metrics.comparisons++;
    onMetricsUpdate?.(metrics.comparisons, metrics.swaps);
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      metrics.swaps++;
      onMetricsUpdate?.(metrics.comparisons, metrics.swaps);
      colorStates[j] = 'right';
      colorStates[i] = 'left';
      updateVisual([...arr], [...colorStates]);
      await sleep(delay);
    } else {
      colorStates[j] = 'right';
      updateVisual([...arr], [...colorStates]);
    }
  }
  if (i + 1 < high) {
    await sleep(delay);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    metrics.swaps++;
    onMetricsUpdate?.(metrics.comparisons, metrics.swaps);
    colorStates[high] = 'right';
    colorStates[i + 1] = 'selected';
    updateVisual([...arr], [...colorStates]);
    await sleep(delay);
  }
  for (let k = low; k <= high; k++) colorStates[k] = 'unsorted';
  updateVisual([...arr], [...colorStates]);
  return i + 1;
}

// Heap Sort
export async function heapSort(arr, updateVisual, delay, onMetricsUpdate) {
  const n = arr.length;
  const colorStates = Array(n).fill('unsorted');
  let heapSize = n;
  let metrics = { comparisons: 0, swaps: 0 };
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, heapSize, i, updateVisual, delay, onMetricsUpdate, colorStates, metrics);
  }
  for (let i = n - 1; i > 0; i--) {
    colorStates[0] = 'selected';
    colorStates[i] = 'compare';
    updateVisual([...arr], [...colorStates]);
    await sleep(delay);
    [arr[0], arr[i]] = [arr[i], arr[0]];
    metrics.swaps++;
    onMetricsUpdate?.(metrics.comparisons, metrics.swaps);
    colorStates[0] = 'compare';
    colorStates[i] = 'selected';
    updateVisual([...arr], [...colorStates]);
    await sleep(delay);
    colorStates[i] = 'sorted';
    updateVisual([...arr], [...colorStates]);
    heapSize--;
    await heapify(arr, heapSize, 0, updateVisual, delay, onMetricsUpdate, colorStates, metrics);
  }
  colorStates[0] = 'sorted';
  updateVisual([...arr], [...colorStates]);
  return arr;
}

async function heapify(arr, heapSize, i, updateVisual, delay, onMetricsUpdate, colorStates, metrics) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  colorStates[i] = 'compare';
  if (left < heapSize) {
    colorStates[left] = 'left';
    metrics.comparisons++;
    onMetricsUpdate?.(metrics.comparisons, metrics.swaps);
  }
  if (right < heapSize) {
    colorStates[right] = 'right';
    metrics.comparisons++;
    onMetricsUpdate?.(metrics.comparisons, metrics.swaps);
  }
  updateVisual([...arr], [...colorStates]);
  await sleep(delay);
  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
    metrics.comparisons++;
    onMetricsUpdate?.(metrics.comparisons, metrics.swaps);
  }
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
    metrics.comparisons++;
    onMetricsUpdate?.(metrics.comparisons, metrics.swaps);
  }
  if (left < heapSize) colorStates[left] = 'unsorted';
  if (right < heapSize) colorStates[right] = 'unsorted';
  colorStates[largest] = 'selected';
  updateVisual([...arr], [...colorStates]);
  await sleep(delay);
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    metrics.swaps++;
    onMetricsUpdate?.(metrics.comparisons, metrics.swaps);
    colorStates[largest] = 'compare';
    colorStates[i] = 'selected';
    updateVisual([...arr], [...colorStates]);
    await sleep(delay);
    colorStates[largest] = 'unsorted';
    colorStates[i] = 'unsorted';
    updateVisual([...arr], [...colorStates]);
    await heapify(arr, heapSize, largest, updateVisual, delay, onMetricsUpdate, colorStates, metrics);
  } else {
    colorStates[i] = 'unsorted';
    updateVisual([...arr], [...colorStates]);
  }
}