import java.util.*;

class Solution {
    public int minCostConnectPoints(int[][] points) {
        int n = points.length; // @viz init
        boolean[] inTree = new boolean[n]; // @viz init
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0])); // {cost to attach, point} // @viz init
        heap.add(new int[] {0, 0}); // start from point 0 // @viz init
        int total = 0, added = 0; // @viz init
        while (added < n) { // @viz pop
            int[] top = heap.poll(); // the cheapest way to attach a new point // @viz pop
            int u = top[1]; // @viz pop
            if (inTree[u]) continue; // an old, more expensive entry for a point already attached // @viz stale
            inTree[u] = true; // @viz add
            total += top[0]; // @viz add
            added++; // @viz add
            for (int v = 0; v < n; v++) { // offer every point outside the tree an edge from u // @viz push
                if (!inTree[v]) { // @viz push
                    heap.add(new int[] {Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]), v}); // @viz push
                }
            }
        }
        return total; // @viz return
    }
}
