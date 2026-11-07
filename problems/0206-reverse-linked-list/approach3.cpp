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
        ListNode *prev = nullptr, *cur = head; // prev: the reversed part so far; cur: the rest // @viz init
        while (cur) { // @viz loop
            ListNode* next = cur->next; // save the rest before cutting the link // @viz save
            cur->next = prev; // turn this link around // @viz flip
            prev = cur; // step forward // @viz step
            cur = next; // @viz step
        }
        return prev; // the old last node // @viz return
    }
};
