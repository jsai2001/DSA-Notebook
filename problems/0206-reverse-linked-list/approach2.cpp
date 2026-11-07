/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (!head || !head->next) return head; // 0 or 1 node: already reversed // @viz base
        ListNode* newHead = reverseList(head->next); // reverse everything after head // @viz call
        head->next->next = head; // head's old next is now the tail: hang head after it // @viz link
        head->next = nullptr; // head is the new tail // @viz link
        return newHead; // the old last node, passed all the way up // @viz return
    }
};
