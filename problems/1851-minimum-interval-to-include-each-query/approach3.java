import java.util.*;
class Solution {
    public int[] minInterval(int[][] intervals, int[] queries) {
        int[][] iv = intervals.clone(); // @viz init
        Arrays.sort(iv, (x, y) -> Integer.compare(x[0], y[0])); // by left end // @viz init
        Integer[] order = new Integer[queries.length]; // @viz init
        for (int k = 0; k < order.length; k++) order[k] = k; // @viz init
        Arrays.sort(order, (x, y) -> Integer.compare(queries[x], queries[y])); // queries from left to right // @viz init
        PriorityQueue<int[]> heap = new PriorityQueue<>((x, y) -> Integer.compare(x[0], y[0])); // {size, right} // @viz init
        int[] ans = new int[queries.length]; // @viz init
        int i = 0; // @viz init
        for (int k : order) { // @viz query
            int q = queries[k]; // @viz query
            while (i < iv.length && iv[i][0] <= q) { heap.add(new int[] {iv[i][1] - iv[i][0] + 1, iv[i][1]}); i++; } // add every interval that has started // @viz push
            while (!heap.isEmpty() && heap.peek()[1] < q) heap.poll(); // ended before q: later queries are bigger, so drop it for good // @viz pop
            ans[k] = heap.isEmpty() ? -1 : heap.peek()[0]; // @viz answer
        }
        return ans; // @viz return
    }
}
