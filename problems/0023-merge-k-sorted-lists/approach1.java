/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        List<ListNode> nodes = new ArrayList<>(); // @viz collect
        for (ListNode head : lists) // @viz collect
            for (ListNode node = head; node != null; node = node.next) nodes.add(node); // @viz collect
        nodes.sort(Comparator.comparingInt(node -> node.val)); // @viz sort
        for (int k = 0; k + 1 < nodes.size(); k++) nodes.get(k).next = nodes.get(k + 1); // relink the same nodes in sorted order // @viz link
        if (nodes.isEmpty()) return null; // no lists, or only empty ones // @viz return
        nodes.get(nodes.size() - 1).next = null; // @viz return
        return nodes.get(0); // @viz return
    }
}
