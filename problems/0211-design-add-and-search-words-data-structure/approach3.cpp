#include <string>
class WordDictionary {
public:
    WordDictionary() : root(new Node()) {} // @viz init
    void addWord(std::string word) {
        Node* node = root; // @viz add
        for (char ch : word) { // @viz add
            int k = ch - 'a'; // @viz add
            if (!node->child[k]) node->child[k] = new Node(); // @viz add
            node = node->child[k]; // @viz add
        }
        node->end = true; // a word ends here // @viz add
    }
    bool search(std::string word) {
        return dfs(root, word, 0); // @viz search
    }
private:
    struct Node {
        Node* child[26] = {};
        bool end = false;
    };
    Node* root;
    bool dfs(Node* node, const std::string& word, size_t i) { // can word[i:] be spelled from node? // @viz dfs
        if (i == word.size()) return node->end; // every letter matched // @viz done
        if (word[i] == '.') { // any child will do: try each one // @viz dot
            for (Node* c : node->child) // @viz dot
                if (c && dfs(c, word, i + 1)) return true; // @viz dot
            return false; // @viz dot
        }
        Node* next = node->child[word[i] - 'a']; // a letter: only one child to follow // @viz letter
        return next && dfs(next, word, i + 1); // @viz letter
    }
};
