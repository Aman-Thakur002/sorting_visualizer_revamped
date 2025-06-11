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
export async function mergeSort(arr, left, right, updateVisual, delay, onMetricsUpdate) {
  const colorStates = Array(arr.length).fill('unsorted');
  
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    await mergeSort(arr, left, mid, updateVisual, delay, onMetricsUpdate);
    await mergeSort(arr, mid + 1, right, updateVisual, delay, onMetricsUpdate);
    
    await merge(arr, left, mid, right, updateVisual, delay, onMetricsUpdate, colorStates);
  }
  
  return arr;
}

async function merge(arr, left, mid, right, updateVisual, delay, onMetricsUpdate, colorStates) {
  const n1 = mid - left + 1;
  const n2 = right - mid;
  
  // Create temp arrays
  const L = new Array(n1);
  const R = new Array(n2);
  
  // Copy data to temp arrays L[] and R[]
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
  
  // Merge the temp arrays back into arr[left..right]
  let i = 0; // Initial index of first subarray
  let j = 0; // Initial index of second subarray
  let k = left; // Initial index of merged subarray
  
  while (i < n1 && j < n2) {
    await sleep(delay);
    
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    
    colorStates[k] = 'selected';
    updateVisual([...arr], [...colorStates]);
    k++;
  }
  
  // Copy the remaining elements of L[], if there are any
  while (i < n1) {
    await sleep(delay);
    arr[k] = L[i];
    colorStates[k] = 'selected';
    updateVisual([...arr], [...colorStates]);
    i++;
    k++;
  }
  
  // Copy the remaining elements of R[], if there are any
  while (j < n2) {
    await sleep(delay);
    arr[k] = R[j];
    colorStates[k] = 'selected';
    updateVisual([...arr], [...colorStates]);
    j++;
    k++;
  }
  
  // Mark the range as unsorted or sorted
  if (left === 0 && right === arr.length - 1) {
    for (let i = left; i <= right; i++) {
      colorStates[i] = 'sorted';
    }
  } else {
    for (let i = left; i <= right; i++) {
      colorStates[i] = 'unsorted';
    }
  }
  
  updateVisual([...arr], [...colorStates]);
  await sleep(delay);
}

// Quick Sort
export async function quickSort(arr, low, high, updateVisual, delay, onMetricsUpdate) {
  const colorStates = Array(arr.length).fill('unsorted');
  
  if (low < high) {
    // pi is partitioning index, arr[pi] is now at right place
    const pi = await partition(arr, low, high, updateVisual, delay, onMetricsUpdate, colorStates);
    
    // Separately sort elements before partition and after partition
    await quickSort(arr, low, pi - 1, updateVisual, delay, onMetricsUpdate);
    
    // Mark elements before pivot as sorted
    for (let i = low; i <= pi; i++) {
      colorStates[i] = 'sorted';
    }
    updateVisual([...arr], [...colorStates]);
    
    await quickSort(arr, pi + 1, high, updateVisual, delay, onMetricsUpdate);
    
    // Mark elements after pivot as sorted
    for (let i = pi + 1; i <= high; i++) {
      colorStates[i] = 'sorted';
    }
    updateVisual([...arr], [...colorStates]);
  }
  
  if (low === 0 && high === arr.length - 1) {
    await sleep(delay);
  }
  
  return arr;
}

async function partition(arr, low, high, updateVisual, delay, onMetricsUpdate, colorStates) {
  // Pivot (Element to be placed at right position)
  const pivot = arr[high];
  colorStates[high] = 'selected';
  updateVisual([...arr], [...colorStates]);
  await sleep(delay);
  
  let i = low - 1; // Index of smaller element
  
  for (let j = low; j <= high - 1; j++) {
    await sleep(delay);
    
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      i++; // Increment index of smaller element
      
      // Swap arr[i] and arr[j]
      [arr[i], arr[j]] = [arr[j], arr[i]];
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
    
    // Swap arr[i + 1] and arr[high] (or pivot)
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    colorStates[high] = 'right';
    colorStates[i + 1] = 'selected';
    updateVisual([...arr], [...colorStates]);
    await sleep(delay);
  }
  
  // Reset colors
  for (let k = low; k <= high; k++) {
    colorStates[k] = 'unsorted';
  }
  updateVisual([...arr], [...colorStates]);
  
  return i + 1;
}

// Heap Sort
export async function heapSort(arr, updateVisual, delay, onMetricsUpdate) {
  const n = arr.length;
  const colorStates = Array(n).fill('unsorted');
  let heapSize = n;
  let comparisons = 0;
  let swaps = 0;
  
  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, heapSize, i, updateVisual, delay, onMetricsUpdate, colorStates);
  }
  
  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    colorStates[0] = 'selected';
    colorStates[i] = 'compare';
    updateVisual([...arr], [...colorStates]);
    await sleep(delay);
    
    // Swap
    [arr[0], arr[i]] = [arr[i], arr[0]];
    colorStates[0] = 'compare';
    colorStates[i] = 'selected';
    updateVisual([...arr], [...colorStates]);
    await sleep(delay);
    
    colorStates[i] = 'sorted';
    updateVisual([...arr], [...colorStates]);
    
    // Call max heapify on the reduced heap
    heapSize--;
    await heapify(arr, heapSize, 0, updateVisual, delay, onMetricsUpdate, colorStates);
  }
  
  colorStates[0] = 'sorted';
  updateVisual([...arr], [...colorStates]);
  
  return arr;
}

async function heapify(arr, heapSize, i, updateVisual, delay, onMetricsUpdate, colorStates) {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // left = 2*i + 1
  const right = 2 * i + 2; // right = 2*i + 2
  
  colorStates[i] = 'compare';
  if (left < heapSize) {
    colorStates[left] = 'left';
    comparisons++;
  }
  if (right < heapSize) {
    colorStates[right] = 'right';
    comparisons++;
  }
  updateVisual([...arr], [...colorStates]);
  await sleep(delay);
  
  // If left child is larger than root
  if (left < heapSize && arr[left] > arr[largest]) {
    largest = left;
    comparisons++;
  }
  
  // If right child is larger than largest so far
  if (right < heapSize && arr[right] > arr[largest]) {
    largest = right;
    comparisons++;
  }
  
  // Reset colors
  if (left < heapSize) colorStates[left] = 'unsorted';
  if (right < heapSize) colorStates[right] = 'unsorted';
  colorStates[largest] = 'selected';
  updateVisual([...arr], [...colorStates]);
  await sleep(delay);
  
  // If largest is not root
  if (largest !== i) {
    // Swap
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    colorStates[largest] = 'compare';
    colorStates[i] = 'selected';
    updateVisual([...arr], [...colorStates]);
    await sleep(delay);
    
    // Reset colors
    colorStates[largest] = 'unsorted';
    colorStates[i] = 'unsorted';
    updateVisual([...arr], [...colorStates]);
    
    // Recursively heapify the affected sub-tree
    await heapify(arr, heapSize, largest, updateVisual, delay, onMetricsUpdate, colorStates);
  } else {
    colorStates[i] = 'unsorted';
    updateVisual([...arr], [...colorStates]);
  }
}