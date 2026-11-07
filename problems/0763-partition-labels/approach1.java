import java.util.*;
class Solution {
    public List<Integer> partitionLabels(String s) {
        List<Integer> res = new ArrayList<>(); // @viz init
        int start = 0, n = s.length(); // @viz init
        while (start < n) { // build one part at a time // @viz part
            int end = s.lastIndexOf(s.charAt(start)); // the part must reach this letter's last copy // @viz part
            for (int j = start; j <= end; j++) // every letter inside pushes the end to its own last copy // @viz grow
                end = Math.max(end, s.lastIndexOf(s.charAt(j))); // lastIndexOf scans from the back: O(n) each time // @viz grow
            res.add(end - start + 1); // @viz cut
            start = end + 1; // @viz cut
        }
        return res; // @viz return
    }
}
