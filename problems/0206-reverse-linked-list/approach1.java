import java.util.*;
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
class Solution {
    public ListNode reverseList(ListNode head) {
        ArrayDeque<Integer> vals = new ArrayDeque<>(); // @viz copy
        for (ListNode node = head; node != null; node = node.next) vals.push(node.val); // copy the values out, front to back // @viz copy
        for (ListNode node = head; node != null; node = node.next) node.val = vals.pop(); // write them back, back to front // @viz write
        return head; // same nodes, values in reverse order // @viz return
    }
}
