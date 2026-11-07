import java.util.*;
class Solution {
    public List<Integer> partitionLabels(String s) {
        int[] first = new int[26], last = new int[26]; // each letter's first and last index // @viz spans
        Arrays.fill(first, -1); // @viz spans
        for (int i = 0; i < s.length(); i++) { // @viz spans
            int k = s.charAt(i) - 'a'; // @viz spans
            if (first[k] < 0) first[k] = i; // @viz spans
            last[k] = i; // @viz spans
        }
        List<int[]> spans = new ArrayList<>(); // @viz spans
        for (int k = 0; k < 26; k++) if (first[k] >= 0) spans.add(new int[] {first[k], last[k]}); // @viz spans
        spans.sort((x, y) -> x[0] - y[0]); // at most 26 spans, by start // @viz merge
        List<Integer> res = new ArrayList<>(); // @viz merge
        int a = spans.get(0)[0], b = spans.get(0)[1]; // the part being built // @viz merge
        for (int i = 1; i < spans.size(); i++) { // @viz merge
            if (spans.get(i)[0] <= b) b = Math.max(b, spans.get(i)[1]); // overlaps: the letters must stay together // @viz merge
            else { // @viz cut
                res.add(b - a + 1); // @viz cut
                a = spans.get(i)[0]; // @viz cut
                b = spans.get(i)[1]; // @viz cut
            }
        }
        res.add(b - a + 1); // @viz return
        return res; // @viz return
    }
}
